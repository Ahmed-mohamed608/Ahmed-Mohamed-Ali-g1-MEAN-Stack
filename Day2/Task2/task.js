function pingServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let online = Math.random() > 0.5;

      if (online) {
        resolve("Server is Online");
      } else {
        reject("Server is Offline");
      }
    }, 1000);
  });
}

async function checkServer() {
  for (let i = 1; i <= 5; i++) {
    try {
      console.log(`Attempt num ${i}`);

      const result = await pingServer();
      console.log(result);

      return; 
    } catch (error) {
      console.log(error);

      if (i === 5) {
        console.log("Server is still offline after 5 attempts.");
      }
    }
  }
}

checkServer();