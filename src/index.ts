window.onload = () => {
  let exclude: boolean = false;
  const packIds = JSON.parse(<string>localStorage.getItem("excludeMe")).packs;
  if (packIds.length === 0) {
    console.log("No packs to exclude this website");
    return;
  }
  packIds.forEach((packId: string) => {
    fetch("https://leontm.me/api/projects/excludeMe/get/id=" + packId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.processable) {
          const pack = data.responseData;
          console.log("Received pack: " + pack.name);
          pack.websites.forEach((website: string) => {
            if (
              (website.includes(".") &&
                document.location.host.includes(website)) ||
              (website.includes("/") &&
                document.location.href.includes(website))
            ) {
              console.log(
                "Excluding this website due to '" +
                  website +
                  "' in pack '" +
                  pack.name +
                  "'"
              );
              return (exclude = true);
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
  if (exclude) {
    console.log("Redirecting to leontm.me");
    window.location.href = `https://leontm.me/projects/excludeMe/excluded=${document.location.href}`;
  }
};
