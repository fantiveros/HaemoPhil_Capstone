import { authen, database } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, signOut, updateEmail } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { UserPatient, UserHematologist } from '../common/constants/user_constants';
import { ShowToast, GetFailedToast, GetSuccessToast } from '../common/common_config/ToastConfig';
import { ref, getDownloadURL, getStorage} from 'firebase/storage';

/*
* NOTE AFTER DEVELOPMENT REMOVE THE CONSOLE, IF NOT NEEDED!! APPLY TO ALL FILES!
*/
export const SignupUser = async(
      navigation, 
      onDone,
      {email, password},
      {hemaName, specialization, hemaConctactNum},
      {patientName, condition, type, sex, severity, patientContactNum, dateOfBirth, ageOfDiagnosis, familyHistory, dateOfDiagnosis},
      isPatient,
    ) => {
      onDone(true)
      var userType = isPatient ? UserPatient : UserHematologist;
      createUserWithEmailAndPassword(authen, email, password)
      .then(res => {
        var uid = authen.currentUser.uid;
        var isCompleted = false;
        if(isPatient)
        {
          isCompleted = CreatePatientDetail(
            {
              name: patientName, 
              condition: condition, 
              type: type, 
              sex: sex, 
              severity: severity, 
              contact: patientContactNum, 
              dateOfBirth: dateOfBirth, 
              ageOfDiagnosis: ageOfDiagnosis, 
              familyHistory: familyHistory, 
              userType: userType, 
              uid: uid,
              email: email,
              dateOfDiagnosis: dateOfDiagnosis
            });
        }
        else
        { 
          isCompleted = CreateHematologistDetail(
            {
              name: hemaName, 
              contact: hemaConctactNum, 
              specialization: specialization, 
              userType: userType,
              uid: uid,
              email: email
            });
        }

        const isSignup = true;
        if(isCompleted)
          SigninUser(navigation, onDone, {isSignup, userType}, {email, password});
      })
      .catch(res => {
        onDone(false)
      })
}

const CreatePatientDetail = async ({name, condition, type, sex, severity, contact, dateOfBirth, ageOfDiagnosis, familyHistory, userType, uid, email, dateOfDiagnosis}) => {
  try {
    await setDoc(doc(database, "user_details", uid), {
      name: name,
      hematological_condition: condition,
      type: type,
      sex: sex,
      bleed_severity: severity,
      contact_number: contact,
      date_of_birth: dateOfBirth,
      age_of_diagnosis: ageOfDiagnosis,
      family_history: familyHistory,
      user_type: userType,
      uid: uid,
      email: email,
      dateOfDiagnosis: dateOfDiagnosis
    });

    return true;

  } catch (e) {
    return false;
  }
}

const CreateHematologistDetail = async ({name, contact, specialization, userType, uid, email}) => {
  try {
      await setDoc(doc(database, "user_details", uid), {
        name: name,
        contact_number: contact,
        specialization: specialization,
        user_type: userType,
        uid: uid,
        email: email
      });

    return true;

  } catch (e) {
    return false;
  }
}

export const SigninUser = (navigation, onDone, {isSignup, userType}, {email, password}) => {
    onDone(true)
    signInWithEmailAndPassword(authen, email, password)
    .then( res => {
      if(isSignup)
      {
        var screen = 'HematologistIntro';
        if(userType == UserPatient)
          screen = 'PatientIntro';

        navigation.navigate(screen)
      }
      else
        navigation.navigate('LandingPage')

      onDone(false)
    })
    .catch( res => {
      GetFailedToast("There is something wrong with your credential. Please try again.")
      onDone(false)
    })
}

export const ResetPassword = (navigation, email, onDone) => {
    onDone(true)
    sendPasswordResetEmail(authen, email)
    .then( res => {
      onDone(false)
      navigation.navigate('Signin')
      GetSuccessToast("Password reset email sent.")
    })
    .catch( res => {
      onDone(false)
      GetFailedToast("Invalid email.")
    })
}

export const UpdateUserPassword = ({newPassword, currentPassword, navigation}, onDone) => {
  onDone(true)
  const user = authen.currentUser
  const password = currentPassword
  const credential = EmailAuthProvider.credential(user.email, password)

  reauthenticateWithCredential(user, credential).then(() => {
      updatePassword(user, newPassword).then((res) => {
        signOut(authen)
        .then((res) => {
          navigation.navigate("Signin")
          ShowToast({isCompleted: true, title: "Success", body: "Password successfully changed."})
          onDone(false)
        })
        .catch((res) => {
          ShowToast({isCompleted: false, title: "Failed", body: "Something went wrong."})
          onDone(false)
        })
      }).catch((error) => {
        ShowToast({isCompleted: false, title: "Failed", body: "Something went wrong, password failed to update."})
        onDone(false)
      });
  }).catch((error) => {
    ShowToast({isCompleted: false, title: "Failed", body: "Invalid Credentials"})
    onDone(false)
  });
}

export const EditUserAccount = async ({currentPassword, name, newEmail, contactNum}, user, onDone, navigation) => {
  onDone(true)
  const currentUser = authen.currentUser
  const password = currentPassword
  const email = newEmail
  const contact_number = contactNum
  const credential = EmailAuthProvider.credential(currentUser.email, password)
  reauthenticateWithCredential(currentUser, credential).then(() => {
    updateEmail(currentUser, email).then(async (res) => {
      await UpdateUserDetail({name, contact_number}, user, currentUser.uid).then(() => {
        signOut(authen)
        .then((res) => {
          navigation.navigate("Signin")
          ShowToast({isCompleted: true, title: "Success", body: "Details succesfully updated."})
          onDone(false)
        })
        .catch((res) => {
          GetFailedToast();
          onDone(false)
        })
      }).catch(() => {
        ShowToast()
        onDone(false)
        return
      })
    }).catch((error) => {
      console.error(error)
      GetFailedToast("Something went wrong, password failed to update.");
      onDone(false)
    });
}).catch((error) => {
  GetFailedToast("Invalid Credentials");
  onDone(false)
});
}

export const UpdateUserProfileImage = async(user, imageUri) => {
  try {
    const currentUser = authen.currentUser
    const storage = getStorage();
    const storageRef = ref(storage, imageUri)

    await getDownloadURL(storageRef).then(async res => {
        await setDoc(doc(database, "user_details", currentUser.uid), {
          ...user,
          profilePicture: res});
    })

    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const UpdateUserDetail = async({name, contact_number}, user, uid) => {
  try {
    await setDoc(doc(database, "user_details", uid), {
      ...user,
      name: name,
      contact_number: contact_number});

  return true;
  } catch (e) {
    console.error(e)
    return false;
  }
}