import React, { useState } from "react";

import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

import Particles from "react-particles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

const Home = () => {
  const [input, setInput] = useState({
    imageUrl:
      "https://th.bing.com/th/id/R.bfab58b382b3a71ba15ab9419e2f4d69?rik=RJVXvXwXgjFCUw&riu=http%3a%2f%2fimage.tmdb.org%2ft%2fp%2foriginal%2fhErUwonrQgY5Y7RfxOfv8Fq11MB.jpg&ehk=3mEIzCrqsR%2fy7i21Wbo1xx5%2bhOXCLUez3sW3RUJ4yWs%3d&risl=&pid=ImgRaw&r=0",
    box: {},
  });
  const [userInformation, setUserInformation] = useState({
    userName: "Guest",
    userEntries: "0",
  });
  const [userId, setUserId] = useState(0);

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

  const clarifaiApiExecution = () => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "lezeri",
        app_id: "face-recognition",
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

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + import.meta.env.VITE_API_KEY,
      },
      body: raw,
    };

    const displayBox = (box) => {
      return setInput((prevState) => ({ ...prevState, box: box }));
    };

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        const FACE_RECOGNITION_VECTOR =
          result.outputs[0].data.regions[0].region_info.bounding_box;
        if (result.status.description == "Ok") {
          const response = await fetch("https://face-recognition-node.onrender.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reqId: userId,
            }),
          });
          const data = await response.json();
          setUserInformation({ ...userInformation, userEntries: data[0].entries });
        }

        return displayBox(calculateFaceLocation(FACE_RECOGNITION_VECTOR));
      })
      .catch((error) => console.log("error", error));
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div>
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
