import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import NavBar from "./NavBar.js";
import { TailSpin } from "react-loader-spinner";

const Body = () => {
  //user source code
  const [userCode, setUserCode] = useState(``);

  //editor default language
  const [userLang, setUserLang] = useState("cpp");

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

   let language_id = 0;

   if (userLang === "python") {
     language_id = 92;
   } else if (userLang === "c") {
     language_id = 50;
   } else if (userLang === "cpp") {
     language_id = 54;
   } else if (userLang === "java") {
     language_id = 91;
   } else if (userLang === "javascript") {
     language_id = 93;
   }

  const options = {
    fontSize: fontSize,
  };
async function compile() {
  setLoading(true);
  if (userCode === ``) {
    setLoading(false);
    return;
  }

  try {
    // Post request to compile endpoint
    const compileResponse = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?&fields=*",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "ba15647143msh8241d9ac3e9752fp1b2534jsndf38df679246",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: userCode,
          language_id: language_id,
          stdin: userInput,
        }),
      }
    );

    if (!compileResponse.ok) {
      throw new Error("Compilation failed");
    }

    const compileData = await compileResponse.json();
    const token = compileData.token;
    console.log(token);
    // Get request to retrieve result using the token
    const getResultResponse = await fetch(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?fields=*`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "ba15647143msh8241d9ac3e9752fp1b2534jsndf38df679246",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    if (!getResultResponse.ok) {
      throw new Error("Failed to fetch result");
    }
    //console.log(getResultResponse);
    const resultData = await getResultResponse.json();
    console.log(resultData);
    setUserOutput(resultData.stdout);
    console.log(userOutput);
  } catch (error) {
    console.error("Error:", error);
   } finally {
    setLoading(false);
  }

}

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  useEffect(() => {
     console.log(userOutput);
   }, [userOutput]);

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


