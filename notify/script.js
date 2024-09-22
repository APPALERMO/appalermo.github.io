const sendNotify = () => {
    Notification.requestPermission()
    .then(perm => {
        if(perm === "granted"){
            new Notification("Accenzione Computer", {
                body: "Qualcuno ha Acceso il Compute!"
            })
        }
    })
}