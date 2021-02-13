import { Finger, FingerCurl, FingerDirection,GestureDescription } from 'fingerpose';

// describe thumbs up gesture 👎
const thumbsDownGesture = new GestureDescription('thumbs_down');

// thumb:
// - not curled
// - vertical up (best) or diagonal up left / right
thumbsDownGesture.addCurl(Finger.Thumb,FingerCurl.NoCurl, 1.0);
thumbsDownGesture.addDirection(Finger.Thumb,FingerDirection.VerticalDown, 1.0);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.5);
thumbsDownGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownRight, 0.5);

// all other fingers:
// - curled
// - horizontal left or right
thumbsDownGesture.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
thumbsDownGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
thumbsDownGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
thumbsDownGesture.addCurl(Finger.Pinky,FingerCurl.FullCurl, 1.0);

