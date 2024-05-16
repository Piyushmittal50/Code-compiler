export const LOADING_WHEEL =
    "https://beebom.com/wp-content/uploads/2020/01/iphone-stuck-on-black-screen-with-spinning-wheel.jpg?w=750&quality=75";


export const compileResponse = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?&fields=*",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key":
            "ca5d37091fmsh047b3efcf0b8d22p1cac2fjsn1fb59f7f5603",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          source_code: userCode,
          language_id: language_id,
          stdin: userInput,
        }),
      }
 );    
  