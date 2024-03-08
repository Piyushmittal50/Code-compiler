import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import NavBar from "./NavBar.js";
import { TailSpin } from "react-loader-spinner";

const Body = () => {
  //user source code
  const [userCode, setUserCode] = useState(``);

  //editor default language
  const [userLang, setUserLang] = useState("python");

  //editor default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  //editor default font size
  const [fontSize, setFontSize] = useState(20);

  //user input
  const [userInput, setUserInput] = useState("");

  //user output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      setLoading(false);
      return;
    }
    // Post request to compile endpoint
     fetch(
       "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "X-RapidAPI-Key":
             "ca5d37091fmsh047b3efcf0b8d22p1cac2fjsn1fb59f7f5603",
           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
         },
         body: JSON.stringify({
           code: userCode,
           language: userLang,
           input: userInput,
         }),
       }
     )
       .then((response) => response.json())
       .then((data) => {
         // If POST request succeeds, fetch the result using the token
         const submissionToken = data.token;
         return fetch(
           `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}?base64_encoded=true&fields=*`);
       })
       .then((response) => response.json())
       .then((data) => {
         setUserOutput(data.output);
       })
       .catch((error) => {
         console.error("Error:", error);
       })
       .finally(() => {
         setLoading(false);
       });
  }
  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  // Function to get language ID based on selected language
  function getLanguageId(language) {
    switch (language) {
      case "python":
        return 92;
      case "c":
        return 50;
      case "cpp":
        return 54;
      case "java":
        return 91;
      case "javascript":
        return 93;
      default:
        return 0;
    }
  }

  return (
    <div className="max-h-full w-full bg-green-500">
      <NavBar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="flex h-full">
        <div className="relative w-4/6">
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button
            className="absolute bottom-10 right-4 w-20 h-10 text-lg font-bold bg-green-500 rounded-md transition duration-300 ease-in-out hover:bg-green-600"
            onClick={() => compile()}
          >
            Run
          </button>
        </div>
        <div className="w-2/5 bg-gray-900 border-l-4 border-blue-500 p-5">
          <div>
            <h4 className="font-bold text-2xl p-1">Input:</h4>
            <div className="mt-2">
              <textarea
                className="w-full h-40 bg-gray-900 text-white p-2 resize-none"
                onChange={(e) => setUserInput(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-2xl p-1">Output:</h4>
            {loading ? (
              <div className="flex justify-center items-center">
                {/* <img src={LOADING_WHEEL} alt="Loading..." className="w-32" /> */}
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div className="overflow-auto">
                <pre className="text-white">{userOutput}</pre>
                <button
                  onClick={() => {
                    clearOutput();
                  }}
                  className="absolute bottom-4 right-4 w-20 h-10 text-lg font-bold bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
