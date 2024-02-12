"use server"

import { collection, addDoc } from 'firebase/firestore'
import { db , store } from '../lib/firebase'
import { ref , uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv'
import axios from 'axios'

config()

async function notify(message){

    const FormData = require('form-data');
    let data = new FormData();
    data.append('message', message);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://notify-api.line.me/api/notify',
      headers: { 
        'Authorization': `Bearer ${process.env.LINE_NOTIFY_F_KEY}` , 
        ...data.getHeaders()
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

async function uploadFile(file,link){

    const fileRef = ref(store , `${link}/${uuidv4()}-${file.name}`)
    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        notify(`file uploaded : ${link}/${uuidv4()}-${file.name}`)
    })

}

async function createPerson(formData){

    await uploadFile(formData.get('file'),formData.get("link"))

    const data = { 
        name: formData.get("name") ,
        link : formData.get("link") ,
        discription : formData.get("discription")
    }

    try{
        const docRef = await addDoc(collection(db,"person"),{
            name:data.name , link:data.link , discription:data.discription
        })

    }
    catch(err){
        console.log(err);
    }
}

export { createPerson }