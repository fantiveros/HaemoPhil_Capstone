import { authen, database } from '../../firebase'
import { getDoc, doc, collection, addDoc, getDocs, query, where  } from "firebase/firestore";
import { ShowToast } from '../common/common_config/ToastConfig';
import { C_Factor7, C_Factor8, C_Factor9, UserPatient } from '../common/constants/user_constants';
import { RetrievePatientList } from './hematologist_tabs/common/service';
import { GetMonthInt } from './user_screens/patient';

export const ReadUserData = async () => 
{
    if(!authen.currentUser)
        return null

    const docRef = doc(database, "user_details", authen.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) 
        return docSnap.data()
    else
        return null;
}

export const RetrievePatientData = async () => {
    const docRef = collection(database, "user_details");
    const q = query(docRef, where("user_type", "==", UserPatient));
    const result = await getDocs(q);

    return result;
}

export const RetrieveFactorConcentrateCounts = async () => {
    let patientsList = []
    let promises = []
    await RetrievePatientList()
        .then(res => res.forEach((doc) => {
            patientsList.push(doc)
        }))
        .catch(res => console.error(res));

    for(var i = 0; i < patientsList.length;i++)
    {
        promises.push(RetrieveFactorConcentrate(patientsList[i].patient_uid))
    }
  
    const finalResult = GetPromiseResult(promises).then(results => {
        let patients = []
        results.map(records => records.map(record => patients.push(record)));

        const factor7 = patients.filter(record => record.factorConcentrate === C_Factor7)
        const factory8 = patients.filter(record => record.factorConcentrate === C_Factor8)
        const factory9 = patients.filter(record => record.factorConcentrate === C_Factor9)
        let months = [];
        let currentMonth = new Date().getMonth()
        for(var x = 0; x < 4; x++)
        {
            var month = GetMonthInt(currentMonth, x)
            var factor7Data = factor7.filter(data => data.dateTime.getMonth() == month)
            var factory8Data = factory8.filter(data => data.dateTime.getMonth() == month)
            var factory9Data = factory9.filter(data => data.dateTime.getMonth() == month)
  
            months.push({
                month: month, 
                factor7: factor7Data.length, 
                factor8: factory8Data.length, 
                factor9: factory9Data.length})
        }

        return months
    });
    return finalResult
}

const GetPromiseResult = async(promises) => {
    const promiseResult = await Promise.all(promises)
        .then(result => result)
        .catch(result => console.error(result))

    return promiseResult
}

const RetrieveFactorConcentrate = async (uid) => {
    const docRef = collection(database, "user_details", uid, "area_bleeding");
    let factorConcentrateData = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            const dateTime = new Date(doc.data().date + " " + doc.data().time)
            const factorConcentrate = doc.data().factorConcentrate
            const time = doc.data().time;

            factorConcentrateData.push({dateTime, time, factorConcentrate});
        }))
        .catch(res => console.error("There is something wrong"));

    return factorConcentrateData.sort((a,b) => b.dateTime - a.dateTime);
}

export const RetrieveVisitationInfusionData = async (onDone) => {
    onDone(true)
    var uid = authen.currentUser.uid;
    const docRef = collection(database, "user_details", uid, "visitation_infusion");
    let visitationInfusionData = [];
    await getDocs(docRef)
        .then(res => res.forEach((doc) => {
            const dateTime = new Date(doc.data().date + " " + doc.data().time)
            const dosage = doc.data().dosage
            const time = doc.data().time;

            visitationInfusionData.push({dateTime, time, dosage});
        }))
        .catch(res => console.error("There is something wrong"));

    return visitationInfusionData.sort((a,b) => b.dateTime - a.dateTime);
}

export const RetrieveBleedingAreaData = async (onDone) => {
    onDone(true)
    var uid = authen.currentUser.uid;
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

            areaBleedingnData.push({dateTime, time, dosage, location, severity, type});
        }))
        .catch(res => console.error("There is something wrong"));

    return areaBleedingnData.sort((a,b) => b.dateTime - a.dateTime);
}

export const CreateVisitationInfusion = async(navigation, onDone, {date, time, dosage}) => {
    onDone(true)

    var uid = authen.currentUser.uid;
    const docRef = doc(database, "user_details", uid);
    const colRef = collection(docRef, "visitation_infusion")
    await addDoc(colRef, {
        date: date,
        time: time,
        dosage: dosage,
    }).then(res => {
        onDone(false)
        navigation.navigate('Home')
        ShowToast({isCompleted: true, title: "Success", body: "Visitation infusion entry added."})
    }).catch(res => {
        ShowToast({isCompleted: false, title: "Failed", body: "There is something wrong, please try again"})
        onDone(false)
    });
}

export const CreateBleedingArea = async(navigation, onDone, {date, time, severity, location, type, dosage, treatment, factor, selectedBrand}, areaOfBleeding) => {
    onDone(true)

    var uid = authen.currentUser.uid;
    const docRef = doc(database, "user_details", uid);
    const colRef = collection(docRef, "area_bleeding")
    await addDoc(colRef, {
        date: date,
        time: time,
        severity: severity,
        location: location,
        type: type,
        dosage: dosage,
        factorConcentrate: factor,
        brand: selectedBrand,
        treatment: treatment
    }).then(res => {
        onDone(false)
        navigation.navigate('PhysicalActivity', {areaOfBleeding})
        ShowToast({isCompleted: true, title: "Success", body: "Area of bleeding entry added."})
    }).catch(res => {
        ShowToast({isCompleted: false, title: "Failed", body: "There is something wrong, please try again"})
        onDone(false)
    });
}