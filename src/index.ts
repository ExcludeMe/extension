window.onload = () => {
  let exclude: boolean = false;
  fetch("https://leontm.me/api/projects/excludeMe/collection/getAll", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.processable) {
        let packs = data.responseData;
        packs.forEach((pack: any) => {
          let websites = pack.websites;
          websites.forEach((website: any) => {
            if (
              window.location.origin.includes(website) ||
              (website.includes(".") && window.location.href.includes(website))
            ) {
              exclude = true;
            }
          });
        });
      }
    });
  if (exclude) {
    console.log("Redirecting to leontm.me");
    window.location.href = `https://leontm.me/projects/excludeMe/excluded=${document.location.href}`;
  }
};
