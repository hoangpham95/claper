var request = require('request');
var cheerio = require('cheerio');

var url = 'https://www.wl11gp.neu.edu/udcprod8/NEUCLSS.p_class_search';

var options = {
    url: 'https://wl11gp.neu.edu/udcprod8/NEUCLSS.p_class_search',
    headers: {
        'Host': 'wl11gp.neu.edu',
        'Connection': 'keep-alive',
        'Origin': 'wl11gp.neu.edu',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    formData: {
        sel_day: "dummy",
        STU_TERM_IN: "201810",
        sel_seat: "dummy",
        p_msg_code: "UNSECURED",
        sel_crn: "",
        sel_subj: "ACCT",
        sel_crse: "",
        sel_title: "",
        sel_attr: "%25",
        sel_levl: "%25",
        sel_schd: "%25",
        sel_insm: "%25",
        sel_from_cred: "",
        sel_to_cred: "",
        sel_camp: "%25",
        sel_ptrm: "%25",
        sel_instr: "%25",
        begin_hh: 0,
        begin_mi: 0,
        begin_ap: "a",
        end_hh: 0,
        end_mi: 0,
        end_ap: "a"
    }
};

request.post(options, function(err, httpResponse, body) {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Succesfully fetch");
        const $ = cheerio.load(body);


    }
});
