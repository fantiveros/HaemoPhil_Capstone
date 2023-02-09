import { authen, database } from "../../../../firebase";
import { doc, collection, addDoc, getDocs, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ShowToast } from '../../../common/common_config/ToastConfig';
import { ref, uploadBytes, getStorage, getDownloadURL} from 'firebase/storage';

export const OnDeleteBleedingEvents = async (uniqueId) =>
    await deleteDoc(doc(database, "bleeding_events", uniqueId))
        .catch(res => console.error(res));

export const OnRemovePatientFromHematologist = async (docId) =>
{
    const uid = authen.currentUser.uid;
    await deleteDoc(doc(database, "user_details", uid, "patients", docId))
        .catch(res => console.error(res)); 
}     

export const UploadLicenseImage = async(user, imageUri) => {
    try {
      const currentUser = authen.currentUser
      const storage = getStorage();
      const storageRef = ref(storage, imageUri)
  
      await getDownloadURL(storageRef).then(async res => {
          await setDoc(doc(database, "user_details", currentUser.uid), {
            ...user,
            licenseUri: res});
      })
  
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

export const ReadUserDetails = async( uid ) => {
    const docRef = doc(database, "user_details", uid);
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) 
        return docSnap.data()
    else
        return null;
}

export const RetrieveVisitationInfusionData = async (uid) => {
    const docRef = collection(database, "user_details", uid, "visitation_infusion");
    let visitationInfusionData = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            const dateTime = new Date(doc.data().date + " " + doc.data().time)
            const dosage = doc.data().dosage
            const time = doc.data().time;
            const date = doc.data().date;

            visitationInfusionData.push({dateTime, date, time, dosage});
        }))
        .catch(res => console.error("There is something wrong"));
        
    return visitationInfusionData.sort((a,b) => b.dateTime - a.dateTime);
}

export const RetrieveBleedingAreaData = async (uid) => {
    const docRef = collection(database, "user_details", uid, "area_bleeding");
    let areaBleedingnData = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            const dateTime = new Date(doc.data().date + " " + doc.data().time)
            const dosage = doc.data().dosage
            const time = doc.data().time;
            const location = doc.data().location;
            const severity = doc.data().severity;
            const type = doc.data().type;
            const brand = doc.data().brand;
            const factorConcentrate = doc.data().factorConcentrate;
            const treatment = doc.data().treatment;
            const date = doc.data().date;

            areaBleedingnData.push({dateTime, time, dosage, location, severity, type, brand, factorConcentrate, treatment, date});
        }))
        .catch(res => console.error("There is something wrong"));

    return areaBleedingnData.sort((a,b) => b.dateTime - a.dateTime);
}

export const AssignPatientToHematologist = async( onDone, patient) => {
    onDone(true)
    var uid = authen.currentUser.uid;
    const docRef = doc(database, "user_details", uid);
    const colRef = collection(docRef, "patients")

    await addDoc(colRef, {
        patient_uid: patient.uid,
        patientName: patient.name,
        type: patient.type,
        profilePicture: patient.profilePicture 
            ? patient.profilePicture 
            : "",
        sex: patient.sex
    }).then(res => {
        onDone(false)
        ShowToast({isCompleted: true, title: "Success", body: "Patient added succesfully."})
    }).catch(res => {
        ShowToast({isCompleted: false, title: "Failed", body: "There is something wrong, please try again"})
        onDone(false)
    });
}

export const RetrievePatientList = async (onDone) => {
    if(onDone)
        onDone(true)
        
    var uid = authen.currentUser.uid;
    const docRef = collection(database, "user_details", uid, "patients");
    let patients = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            const data = doc.data();
            patients.push({...data, docId: doc.id});
        }))
        .catch(res => console.error(res));
    
    return patients
}

export const RetrieveBleedingEvents = async (onDone) => {
    if(onDone)
        onDone(true)
        
    const docRef = collection(database, "bleeding_events");
    let bleeding_events = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            bleeding_events.push(doc.data());
        }))
        .catch(res => console.error(res));
    
    return bleeding_events
}

const GetPromiseResult = async(promises) => {
    const promiseResult = await Promise.all(promises)
        .then(result => result)
        .catch(result => console.error(result))

    return promiseResult
}

export const OnSaveBleedingEvents = async(bleedingEvent, onDone) => {
    const currentDate = new Date().toString();
    let promises = []
    let uploadImagePromises = []
    const physicalActivities = bleedingEvent.physicalActivities
    uploadImagePromises.push(UploadImage(bleedingEvent.image, `${currentDate}_bleeding_event_icon`))
    for(var i = 0; i < physicalActivities.length;i++)
    {
        uploadImagePromises.push(UploadImage(physicalActivities[i].image, `${currentDate}_${physicalActivities[i].step}`))
    }

    await GetPromiseResult(uploadImagePromises)
        .then(results => console.log(results))
        .catch(results => console.error(results));

    promises.push(CreateBleedingEvent(bleedingEvent, currentDate))
    
    await GetPromiseResult(promises)
        .then(results => {onDone(false)})
        .catch(results => console.error(results));
}

const UploadImage = async (image, currentDate) => {
    if (!image && image.length < 1)
        return

    const storage = getStorage();
    const response = await fetch(image)
    const blob = await response.blob();
    const filename = `${currentDate}` + image.substring(image.lastIndexOf('/') + 1)
    const storageRef = ref(storage, `bleeding_event/physical_activity/${filename}`);

    const metadata = {
        contentType: 'image/jpeg',
    };

    await uploadBytes(storageRef, blob, metadata).catch(error => console.error(error));
}

  const CreateBleedingEvent = async(bleedingEvent, currentDate) => {
    const storage = getStorage();

    try {
        const physicalActivities = bleedingEvent.physicalActivities
        let promises = []

        physicalActivities.map(async activity => {
            const stepImage = activity.image
            const stepFileName = `${currentDate}_${activity.step}` + stepImage.substring(stepImage.lastIndexOf('/') + 1)
            const stepStorageFile = ref(storage, `bleeding_event/physical_activity/${stepFileName}`);

            promises.push(GetDownloadUrl({storageRef: stepStorageFile, data: activity}))
        })

        await GetPromiseResult(promises)
        .then(async results => {
            const bleedingEventIcon = bleedingEvent.image
            const bleedingEventFilename = `${currentDate}_bleeding_event_icon` + bleedingEventIcon.substring(bleedingEventIcon.lastIndexOf('/') + 1)
            const bleedingEventStorageRef = ref(storage, `bleeding_event/physical_activity/${bleedingEventFilename}`);

            await getDownloadURL(bleedingEventStorageRef).then(async res => {
                const finalBleedingEvents = {...bleedingEvent, physicalActivities: results, image: res}
                await setDoc(doc(database, "bleeding_events", finalBleedingEvents.uniqueId), finalBleedingEvents);
            }).catch(err => console.error(err))
        })
        .catch(results => console.error(results));
        
        return true
    } catch (e) {
        console.error(e)
        return false
    }
  }

  const GetDownloadUrl = async ({storageRef, data}) => await getDownloadURL(storageRef).then(async res => {
        return {...data, image: res}
    }).catch(err => console.error(err))