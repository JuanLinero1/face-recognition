import React, { useState } from "react";
import "./main.css";

import Particles from "react-particles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

import FaceRecognition from "./components/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm";
import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

const App = () => {
  const [input, setInput] = useState({
    input: "",
    imageUrl:
      "https://th.bing.com/th/id/R.bfab58b382b3a71ba15ab9419e2f4d69?rik=RJVXvXwXgjFCUw&riu=http%3a%2f%2fimage.tmdb.org%2ft%2fp%2foriginal%2fhErUwonrQgY5Y7RfxOfv8Fq11MB.jpg&ehk=3mEIzCrqsR%2fy7i21Wbo1xx5%2bhOXCLUez3sW3RUJ4yWs%3d&risl=&pid=ImgRaw&r=0",
    box: {},
  });


  const calculateFaceLocation = (data) => {
    const image = document.getElementsByClassName("container__img")
    console.log(image[0])
    const width = Number(image[0].width)
    const height = Number(image[0].height)

    
  }
  calculateFaceLocation()

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

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const FACE_RECOGNITION_VECTOR = result.outputs[0].data.regions[0].region_info.bounding_box
        FaceRecognition(FACE_RECOGNITION_VECTOR)
        console.log(FACE_RECOGNITION_VECTOR)
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
    <div className="app">
      <Logo />
      <Navigation />
      <ImageLinkForm
        clarifaiExe={clarifaiApiExecution}
        setInputUrl={setInput}
      />
      <FaceRecognition inputUrl={input.imageUrl} />
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

export default App;
