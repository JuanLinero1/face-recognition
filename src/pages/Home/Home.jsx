import React, { useState } from "react";

import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

import Particles from "react-particles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [input, setInput] = useState({
    imageUrl:
      "",
    box: {},
  });
  const [userInformation, setUserInformation] = useState({
    userName: "Guest",
    userEntries: "0",
  });
  const [userId, setUserId] = useState(0);

  const optionToast = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("container__img");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      topCol: data.top_row * width,
      leftCol: data.left_col * height,
      bottomCol: height - data.bottom_row * height,
      rightCol: width - data.right_col * width,
    };
  };

  const clarifaiApiExecution = async () => {
    const RAW = JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              url: input.imageUrl,
            },
          },
        },
      ],
    });

    const REQUEST_OPTIONS = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + "acc1ef3cb3104f6a9819c9515f2b8ac0",
      },
      body: RAW,
    };

    const displayBox = (box) => {
      return setInput((prevState) => ({ ...prevState, box: box }));
    };

    try {
      const RESPONSE = await fetch(
        `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
        REQUEST_OPTIONS
      );
      const DATA = await RESPONSE.json();
      const FACE_RECOGNITION_VECTOR =
        DATA.outputs[0].data.regions[0].region_info.bounding_box;

      if (DATA.status.code == 10000) {
        const response = await fetch("https://face-recognition-node.onrender.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reqId: userId,
          }),
        });
        const data = await response.json();
        setUserInformation({
          ...userInformation, userEntries: data[0].entries == undefined ? 0 : data[0].entries
        });
      }

      return displayBox(calculateFaceLocation(FACE_RECOGNITION_VECTOR));
    } catch (error) {
      toast.error('Please add a valid link', optionToast)
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Logo />
      <Navigation
        setUserInformation={setUserInformation}
        setUserId={setUserId}
      />
      <ImageLinkForm
        userInformation={{ userInformation }}
        setUserInformation={setUserInformation}
        clarifaiExe={clarifaiApiExecution}
        setInputUrl={setInput}
      />
      <FaceRecognition inputUrl={input.imageUrl} box={input.box} />
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            value: "white",
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              resize: true,
            },
            modes: {
              push: {
                quantity: 30,
              },
              repulse: {
                distance: 100,
                duration: 1,
              },
            },
          },
          particles: {
            color: {
              value: "#000",
            },
            links: {
              color: "#333",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Home;
