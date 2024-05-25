"use strict";
window.onload = () => {
    let exclude = false;
    fetch("https://leontm.me/api/projects/excludeMe/collection/getAll", {
        method: "GET",
    })
        .then((res) => res.json())
        .then((data) => {
        if (data.processable) {
            let packs = data.responseData;
            packs.forEach((pack) => {
                let websites = pack.websites;
                websites.forEach((website) => {
                    if (window.location.origin.includes(website) ||
                        (website.includes(".") && window.location.href.includes(website))) {
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
//# sourceMappingURL=index.js.map