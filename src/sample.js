import "@babel/polyfill/noConflict";

import PostAffiliatePro from "./index";

const postaffiliatepro = new PostAffiliatePro("http://<Affiliate>.postaffiliatepro.com/scripts/server.php", "http://<Affiliate>.postaffiliatepro.com/affiliates/login.php", "user", "pass");

(async () => {
    //Campaigns
    let campaigns = await postaffiliatepro.campaigns();
    console.log(campaigns);

    //Coupons
    let coupons = await postaffiliatepro.promo(20, 0, 1000);
    console.log(coupons);

    //Report
    let report = await postaffiliatepro.report("2020-04-01", "2020-04-01", "A");
    console.log(report);

    //Deeplink
    let deeplink = await postaffiliatepro.deeplink("https://www.franciscajoias.com.br/", "245cc698");
    console.log(deeplink);
})();