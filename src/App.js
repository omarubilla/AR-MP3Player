import React, {useEffect, useState} from 'react';
import $ from 'jquery';

import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose/dist/fingerpose';


function App() {

  //authentication
  const [id, setId] = useState(0);
  const [isAuth, setIsAuth] = useState(false);

  const [volUp, setVolUp] = useState('');
  const [volDown, setVolDown] = useState('');
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const [pause, setPause] = useState('');

  const getId = () => {
    if (!isAuth) {
      $.get({url: 'http://34.72.9.221/get_id.php',
        success: res => {
          setId(res.id);
        }, error: () => console.log('failed to retrieve an id')});
    }
  }

  const checkAuth = () => {
    $.get({url: 'http://34.72.9.221/check_token.php?id=' + id,
      success: res => {
        if (!res.is_set) checkAuth();
        else setIsAuth(true);
      }, error: () => console.log('failed to check if token set.')});
  }



  // const authenticate =
  /* ------ NEW GESTURES (start) */

  	// Flat palm
  	const flatPalmGesture = new fp.GestureDescription('flat_palm');

    flatPalmGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    flatPalmGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

  	flatPalmGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  	flatPalmGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

  	flatPalmGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
  	flatPalmGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

  	flatPalmGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
  	flatPalmGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);

    flatPalmGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
    flatPalmGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);

  	// Point up

  	const pointUpGesture = new fp.GestureDescription('point_up');

    pointUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.25);
    pointUpGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.75);
    pointUpGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);

  	pointUpGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  	pointUpGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);

  	pointUpGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  	pointUpGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);

  	pointUpGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  	pointUpGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);

    pointUpGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    pointUpGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);

  	// Point down

  	const pointDownGesture = new fp.GestureDescription('point_down');

    pointDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.25);
    pointDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.75);
    pointDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);

  	pointDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  	pointDownGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 1.0);

  	pointDownGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  	pointDownGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalDown, 1.0);

  	pointDownGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  	pointDownGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalDown, 1.0);

    pointDownGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    pointDownGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalDown, 1.0);

  	// Point left

  	const pointLeftGesture = new fp.GestureDescription('point_left');

    pointLeftGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.25);
    pointLeftGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.75);
    pointLeftGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalLeft, 1.0);

  	pointLeftGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  	pointLeftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);

  	pointLeftGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  	pointLeftGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalLeft, 1.0);

  	pointLeftGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  	pointLeftGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.HorizontalLeft, 1.0);

    pointLeftGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    pointLeftGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.HorizontalLeft, 1.0);

  	// Point right

  	const pointRightGesture = new fp.GestureDescription('point_right');

    pointRightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.25);
    pointRightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 0.75);
    pointRightGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.HorizontalRight, 1.0);

  	pointRightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
  	pointRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);

  	pointRightGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
  	pointRightGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.HorizontalRight, 1.0);

  	pointRightGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
  	pointRightGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.HorizontalRight, 1.0);

    pointRightGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    pointRightGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.HorizontalRight, 1.0);

  	// /* ------ NEW GESTURES (end) */
    //
    const config = {
      video: { width: 320, height: 240, fps: 30 }
    };
    //
    const landmarkColors = {
      thumb: 'red',
      indexFinger: 'blue',
      middleFinger: 'yellow',
      ringFinger: 'green',
      pinky: 'pink',
      palmBase: 'white'
    };
    //
    const gestureStrings = {
      'flat_palm': 'Play/Pause',
      'point_up': 'Vol up',
      'point_down': 'Vol down',
      'point_left': 'Prev track',
      'point_right': 'Next track'
    };
    const [currGesture, setCurrGesture] = useState("");
    const gestureImgs = {
      'point_up': 'https://cdn.shopify.com/s/files/1/1061/1924/products/Up_Pointing_Backhand_Index_Emoji_Icon_ios10_large.png',
      'point_down': 'https://cdn.shopify.com/s/files/1/1061/1924/products/Down_Pointing_Backhand_Index_Emoji_Icon_ios10_large.png',
      'point_left': 'https://cdn.shopify.com/s/files/1/1061/1924/products/Left_Pointing_Backhand_Index_Emoji_Icon_ios10_large.png',
      'point_right': 'https://cdn.shopify.com/s/files/1/1061/1924/products/Right_Pointing_Backhand_Index_Emoji_Icon_ios10_large.png',
      'flat_palm': 'https://cdn.shopify.com/s/files/1/1061/1924/products/Raised_Back_Of_Hand_Emoji_Icon_ios10_large.png'
    }

    // console.log(spotifyCalls);

    //
    async function main() {

      const video = document.querySelector("#pose-video");
      const canvas = document.querySelector("#pose-canvas");
      const ctx = canvas.getContext("2d");

      const resultLayer = document.querySelector("#pose-result");

      // configure gesture estimator
      const knownGestures = [
        flatPalmGesture,
        pointUpGesture,
        pointDownGesture,
        pointLeftGesture,
        pointRightGesture,
      ];
      const GE = new fp.GestureEstimator(knownGestures);

      // load handpose model
      const model = await handpose.load();
      console.log("Handpose model loaded");

      // main estimation loop
      const estimateHands = async () => {

        // clear canvas overlay
        ctx.clearRect(0, 0, config.video.width, config.video.height);
        resultLayer.innerText = '';

        // get hand landmarks from video
        // Note: Handpose currently only detects one hand at a time
        // Therefore the maximum number of predictions is 1
        const predictions = await model.estimateHands(video, true);

        for(let i = 0; i < predictions.length; i++) {

          // draw colored dots at each predicted joint position
          for(let part in predictions[i].annotations) {
            for(let point of predictions[i].annotations[part]) {
              drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
            }
          }

          // now estimate gestures based on landmarks
          // using a minimum confidence of 7.5 (out of 10)
          const est = GE.estimate(predictions[i].landmarks, 7.5);

          if(est.gestures.length > 0) {

            // find gesture with highest confidence
            let result = est.gestures.reduce((p, c) => {
              return (p.confidence > c.confidence) ? p : c;
            });

            setCurrGesture(gestureImgs[result.name]);
            const spotifyCalls = {
              'point_up': volUp,
              'point_down': volDown,
              'point_left': prev,
              'point_right': next,
              'flat_palm': pause
            }
            if (spotifyCalls) $.get({url: spotifyCalls[result.name]});
          }
        }

        // ...and so on
        setTimeout(() => { estimateHands(); }, 1000 / config.video.fps);
      };

      estimateHands();
      console.log("Starting predictions");
    }

    async function initCamera(width, height, fps) {

      const constraints = {
        audio: false,
        video: {
          facingMode: "user",
          width: width,
          height: height,
          frameRate: { max: fps }
        }
      };

      const video = document.querySelector("#pose-video");
      video.width = width;
      video.height = height;

      // get video stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;

      return new Promise(resolve => {
        video.onloadedmetadata = () => { resolve(video) };
      });
    }

    function drawPoint(ctx, x, y, r, color) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }

    window.addEventListener("DOMContentLoaded", () => {
    //
      initCamera(
        config.video.width, config.video.height, config.video.fps
      ).then(video => {
        video.play();
        video.addEventListener("loadeddata", event => {
          console.log("Camera is ready");
          main();
        });
      });

      const canvas = document.querySelector("#pose-canvas");
      canvas.width = config.video.width;
      canvas.height = config.video.height;
      console.log("Canvas initialized");
    });

    // sign into spotify
    useEffect(() => {
      if (id) {
        window.open('http://34.72.9.221/auth.php?id=' + id, '_blank');
        checkAuth();

        setVolUp('http://34.72.9.221/volume_up.php?id=' + id);
        setVolDown('http://34.72.9.221/volume_down.php?id=' + id);
        setPrev('http://34.72.9.221/previous.php?id=' + id);
        setNext('http://34.72.9.221/next.php?id=' + id);
        setPause('http://34.72.9.221/pause.php?id=' + id);
      }
    }, [id]);
  return (
    <div className="App">
      <header className="App-header">
      <button id="login-btn" onClick={() => getId()} disabled={isAuth ? true : false} >{isAuth ? 'connected' : 'log in'}</button>
      <div id="video-container">
        <video id="pose-video" class="layer" playsinline></video>
        <canvas id="pose-canvas" class="layer"></canvas>
        <div id="pose-result" class="layer"></div>
      </div>

      <div id="gesture-container">
      <img id="pose-res" src={currGesture} />
      </div>
      </header>
    </div>
  );
}

export default App;
