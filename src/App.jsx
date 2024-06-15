import { useCallback, useState, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(12); // Increased default length for stronger passwords
  const [numberAllowed, setNumberAllowed] = useState(true); // Default to include numbers
  const [charAllowed, setCharAllowed] = useState(true); // Default to include special characters
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef(null);

  // Function to generate password based on current settings
  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()+_{}[]:;><,/";

    let pass = "";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

    // Focus on the password input after generating a new password
    if (passwordInputRef.current) {
      passwordInputRef.current.select();
    }
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  // Function to handle copying password to clipboard
  const handleCopy = () => {
    if (passwordInputRef.current) {
      navigator.clipboard.writeText(passwordInputRef.current.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Overlay to enhance readability */}
      <div className="absolute inset-0 bg-black opacity-25 z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold">Secure Password Generator</h1>
          <p className="mt-2 text-lg">Generate strong passwords with ease!</p>
        </header>

        {/* Password Generator */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 max-w-md w-full">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordInputRef}
              className="flex-1 py-3 px-4 border border-gray-700 rounded-md outline-none focus:border-blue-500 text-xl font-mono bg-gray-700 text-gray-200"
              placeholder="Generated Password"
            />
            <button
              onClick={handleCopy}
              className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300"
            >
              Copy Password
            </button>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-lg text-gray-300">Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="20"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full cursor-pointer appearance-none rounded-md h-2 bg-gray-700 outline-none focus:bg-blue-500"
            />
          </div>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <label className="flex items-center text-lg text-gray-300">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={(e) => setNumberAllowed(e.target.checked)}
                className="mr-2"
              />
              Include numbers
            </label>
            <label className="flex items-center text-lg text-gray-300">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={(e) => setCharAllowed(e.target.checked)}
                className="mr-2"
              />
              Include special characters
            </label>
          </div>
          <button
            onClick={generatePassword}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300"
          >
            Generate Secure Password
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400">
          <p className="text-lg mb-2">Made with <span className="text-red-500">&hearts;</span> by Aditya</p>
          <p className="text-sm">Stay secure online!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
