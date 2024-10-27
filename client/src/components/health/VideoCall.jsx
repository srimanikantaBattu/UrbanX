import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCall() {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("emailId");
  const [link,setLink] = React.useState('');
  async function sendData() {
    console.log(link);
    const video = {meetingLink:link,hospitalID:state.hospital._id,username:username , emailId:email};
    try {
      let response = await axios.post(`${process.env.REACT_APP_BACK_URL}/hospital-api/send-video`, video);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  // useLocation hook to access the location object
  let {state} = useLocation();
  console.log(state);
      const roomID = getUrlParams().get('roomID') || randomID(5);
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 1772105193;
      const serverSecret = "55a4f001ebff26581c4a54cdeea27b9f";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));

    
     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

    
  };

  return (
    <div className="">
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw' , height: '100vh' }}
    ></div>
    <div className='text-center pb-20'>
    <input onChange={(e)=>{setLink(e.target.value)}} className='border border-gray-300 px-3 py-1' type="text" name="" id="" />
    <button className='border rounded-lg ms-2 px-3 py-1 bg-black text-white' onClick={sendData}>Send meeting ID</button>
    </div>
    </div>
  );
}