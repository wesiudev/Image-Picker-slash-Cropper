import React, { useRef, useState, useEffect } from "react";
import circle from "../../../images/circle.png";
import FileBase from "react-file-base64";
import { Finger } from "react-finger";

interface ImageProps {
  defaultImage: string;
}
interface ChosenImg {
  name: string;
  size: number;
  src: string;
}
const ImageModal = ({ defaultImage }: ImageProps) => {
  //ref to img
  const imageRef = useRef<HTMLImageElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  //base64
  const fileBaseRef = useRef<HTMLInputElement>(null);
  //local img
  const [chosenImg, setChosenImg] = useState<ChosenImg>({
    name: "",
    size: 0,
    src: "",
  });
  //image translateX limits
  const [imagePreviewLimits, setImagePreviewLimits] = useState<{
    maxLeft: number | undefined;
    maxRight: number | undefined;
  }>({ maxLeft: 0, maxRight: 0 });
  //store user input
  const [imageTransform, setImageTransform] = useState<number>(0);
  //editor visiblitiy
  const [isEditorVisible, setEditorVisibility] = useState<boolean>(false);
  //correct img after upload
  const [isCorrected, setIsCorrected] = useState<boolean>(true);
  //### FUNCTIONS ###
  function moveImage(e: React.MouseEvent<HTMLDivElement, MouseEvent> | any) {
    //get X on the first click
    const startPosition = { x: e.pageX };
    //user moves a mouse
    function onMouseMove(mouseMoveEvent: MouseEvent) {
      if (imagePreviewLimits.maxLeft && imagePreviewLimits.maxRight) {
        if (
          //if image didn't break the limits
          mouseMoveEvent.pageX - startPosition.x > imagePreviewLimits.maxLeft &&
          mouseMoveEvent.pageX - startPosition.x < -imagePreviewLimits.maxRight
        ) {
          //set image movement to the local store and prepare for the database onboarding
          const currentTranslateX = mouseMoveEvent.pageX - startPosition.x;
          setImageTransform(currentTranslateX);
        } else {
          return;
        }
      } else {
        return;
      }
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  }

  const FingeredDiv = Finger("div");

  function handleImageUpload(base64: any) {
    setChosenImg({
      name: base64.name,
      size: base64.file.size,
      src: base64.base64,
    });
    setTimeout(() => {
      setImagePreviewLimits({
        maxLeft: imagePreviewRef?.current?.offsetLeft,
        maxRight: imagePreviewRef?.current?.offsetLeft,
      });
    }, 200);
    setEditorVisibility(true);
    setIsCorrected(true);
  }
  function handleEditorClose() {
    setEditorVisibility(false);
    setChosenImg({ ...chosenImg, src: "" });
    setIsCorrected(true);
  }
  function handleImageSource() {
    //order of image rendering from the most to the least important source
    //source - from the db
    //chosenImg - img that user just uploaded
    //default - no img in the db
    if (chosenImg.src) {
      return `${chosenImg.src}`;
    } else {
      return `${defaultImage}`;
    }
  }
  function scaleAvatar() {
    //responsive scaling of the translateX
    //mobile
    if (window.innerWidth < 766) {
      if (imageTransform) {
        return imageTransform * 0.45;
      }
      //pc
    } else if (window.innerWidth > 766) {
      if (imageTransform) {
        return imageTransform * 0.5;
      }
    }
  }
  function handleSubmit() {
    alert(
      `user input was img name: ${chosenImg.name}, move: ${imageTransform}`
    );
    setEditorVisibility(false);
    setIsCorrected(false);
  }

  function correctImage() {
    setEditorVisibility(true);
    setIsCorrected(true);
  }
  const imgAvatarStyle = {
    transform: `translateX(${scaleAvatar()}px)`,
  };
  const imgPreviewStyle = {
    transform: `translateX(${imageTransform}px)`,
  };
  return (
    <>
      <div className="avatar">
        <div className="avatar__fileInput">
          <FileBase
            ref={fileBaseRef}
            type="file"
            multiple={false}
            onDone={(base64: any) => handleImageUpload(base64)}
          />
          {!isCorrected ? (
            <div className="avatar__fileInput__correction">
              <div className="avatar__fileInput__correction__wrapper">
                <span onClick={correctImage} className="correction">
                  Popraw{" "}
                </span>
                <span onClick={() => setIsCorrected(true)} className="close">
                  x
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="avatar__content">
          <img
            style={imgAvatarStyle}
            ref={imageRef}
            src={handleImageSource()}
            alt=""
          />
        </div>
      </div>
      {isEditorVisible ? (
        <div className="editor">
          <div className="editor__content">
            <div className="editor__content__wrapper">
              <FingeredDiv
                onFingerDown={(e) => moveImage(e)}
                onMouseDown={(e) => moveImage(e)}
                className="editor__content__wrapper__image"
              >
                <div className="editor__content__wrapper__image__circle">
                  <img src={circle} alt="" />
                </div>
                <img
                  style={imgPreviewStyle}
                  ref={imagePreviewRef}
                  src={handleImageSource()}
                  alt=""
                />
              </FingeredDiv>
            </div>
            <div className="editor__content__tools">
              <div className="info">
                {chosenImg ? chosenImg.name : "Nie wybrano obrazu"}
              </div>
              <div className="editor__content__tools__menager">
                <div className="tools"></div>
                <div className="buttons">
                  <button onClick={handleEditorClose} className="btnCancel">
                    ANULUJ
                  </button>
                  <button onClick={() => handleSubmit()}>ZAPISZ</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageModal;
