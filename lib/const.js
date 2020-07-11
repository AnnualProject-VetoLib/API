const DEV = true;
module.exports = {
    DATA_BASE_URL: "mongodb+srv://loghan:Voitures97130@dvilcluster-ehelb.gcp.mongodb.net/vetolib",
    SERVER_HOST: (DEV ? "localhost" : "vetolib-lrams.herokuExpress.com"),
    SERVER_PORT: (+process.env.PORT || 5000)
}