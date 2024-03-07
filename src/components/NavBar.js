import React from 'react'
import Select from 'react-select';
const NavBar = ({userLang,setUserLang,userTheme,setUserTheme,fontSize,setFontSize,}) => {
    const languages = [
       { value: "c", label: "C" },
       { value: "cpp", label: "C++" },
       { value: "python", label: "Python" },
       { value: "java", label: "Java" },
    ];
    const themes = [
       { value: "vs-dark", label: "Dark" },
       { value: "light", label: "Light" },
    ];
    return (
      <div className="flex flex-row bg-gray-600 text-white h-20 left-0 gap-20">
        <h1 className="font-bold mt-4 ml-4 text-2xl">Code Compiler</h1>
        <Select
          className="pt-4"
          options={languages}
          value={userLang}
          onChange={(e) => setUserLang(e.value)}
          placeholder={userLang}
        />
        <Select
          className="pt-4"
          options={themes}
          value={userTheme}
          onChange={(e) => setUserTheme(e.value)}
          placeholder={userTheme}
        />
        <label className="pt-4 font-bold text-xl ">Font Size</label>
        <input
          type="range"
          min="18"
          max="30"
          value={fontSize}
          step="2"
          onChange={(e) => {
            setFontSize(e.target.value);
          }}
        />
      </div>
    );
};

export default NavBar;
