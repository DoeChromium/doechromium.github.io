var clockElement = document.getElementById("clock");

function clock() {
  clockElement.textContent = new Date().toString();
}

setInterval(clock, 1000);

// ----------- //

navigator.getBattery().then(function (battery) {
  function showAllBatteryInfo() {
    editChargeInfo();
    editLevelInfo();
    editChargingInfo();
    editDischargingInfo();
  }
  showAllBatteryInfo();

  battery.addEventListener("chargingchange", function () {
    editChargeInfo();
  });
  function editChargeInfo() {
    /* Test with the charger and without 
        charger by unplugging*/
    var isBatteryCharging = battery.charging ? "Yes" : "No";
    document.getElementById("is-battery-charging").innerText =
      isBatteryCharging;
  }

  battery.addEventListener("levelchange", function () {
    editLevelInfo();
  });
  function editLevelInfo() {
    /* Shows the battery level*/
    var batteryLevel = battery.level * 100;
    document.getElementById("battery-percentage").innerText = batteryLevel;
  }

  battery.addEventListener("chargingtimechange", function () {
    editChargingInfo();
  });
  function editChargingInfo() {
    /* Test with the charger and without charger by unplugging*/
    var charge = battery.chargingTime;
    document.getElementById("chargingtime").innerText = charge;
  }

  battery.addEventListener("dischargingtimechange", function () {
    editDischargingInfo();
  });
  function editDischargingInfo() {
    var disCharge = battery.dischargingTime;
    document.getElementById("dischargingtime").innerText = disCharge;
  }
});

// -------------- //

(function (window) {
  {
    var unknown = "-";

    // screen
    var screenSize = "";
    if (screen.width) {
      width = screen.width ? screen.width : "";
      height = screen.height ? screen.height : "";
      screenSize += "" + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = "" + parseFloat(nVer);
    var nameOffset, verOffset, ix;

    // Yandex Browser
    if ((verOffset = nAgt.indexOf("YaBrowser")) != -1) {
      browser = "Yandex";
      version = nAgt.substring(verOffset + 10);
    }
    // Samsung Browser
    else if ((verOffset = nAgt.indexOf("SamsungBrowser")) != -1) {
      browser = "Samsung";
      version = nAgt.substring(verOffset + 15);
    }
    // UC Browser
    else if ((verOffset = nAgt.indexOf("UCBrowser")) != -1) {
      browser = "UC Browser";
      version = nAgt.substring(verOffset + 10);
    }
    // Opera Next
    else if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
    }
    // Opera
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Legacy Edge
    else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Microsoft Legacy Edge";
      version = nAgt.substring(verOffset + 5);
    }
    // Edge (Chromium)
    else if ((verOffset = nAgt.indexOf("Edg")) != -1) {
      browser = "Microsoft Edge";
      version = nAgt.substring(verOffset + 4);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf("Trident/") != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(nAgt.indexOf("rv:") + 3);
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

    majorVersion = parseInt("" + version, 10);
    if (isNaN(majorVersion)) {
      version = "" + parseFloat(nVer);
      majorVersion = parseInt(nVer, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled =
        document.cookie.indexOf("testcookie") != -1 ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [
      { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
      { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
      { s: "Windows Vista", r: /Windows NT 6.0/ },
      { s: "Windows Server 2003", r: /Windows NT 5.2/ },
      { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
      { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
      { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
      { s: "Windows 98", r: /(Windows 98|Win98)/ },
      { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
      { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Chrome OS", r: /CrOS/ },
      { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
      { s: "iOS", r: /(iPhone|iPad|iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }

    switch (os) {
      case "Mac OS":
      case "Mac OS X":
      case "Android":
        osVersion =
          /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(
            nAgt
          )[1];
        break;

      case "iOS":
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        osVersion =
          osVersion[1] + "." + osVersion[2] + "." + (osVersion[3] | 0);
        break;
    }

    var flashVersion = "no check";
    if (typeof swfobject != "undefined") {
      var fv = swfobject.getFlashPlayerVersion();
      if (fv.major > 0) {
        flashVersion = fv.major + "." + fv.minor + " r" + fv.release;
      } else {
        flashVersion = unknown;
      }
    }
  }

  window.jscd = {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    flashVersion: flashVersion,
  };
})(this);

document.getElementById("1").innerHTML =
  jscd.os +
  " " +
  jscd.osVersion +
  " " +
  jscd.browser +
  " " +
  jscd.browserMajorVersion +
  " (" +
  jscd.browserVersion +
  ")<br>" +
  jscd.mobile +
  "<br>" +
  jscd.flashVersion +
  "<br>" +
  jscd.cookies +
  "<br>" +
  jscd.screen +
  "<br>" +
  navigator.userAgent;

$("#screen_resolution").html(screen.width + " x " + screen.height);

var webrun = navigator.onLine;
document.getElementById("webrun").innerHTML = "Online? " + webrun;

document.addEventListener("DOMContentLoaded", function () {
  let content = document.getElementById("2");
  let textContent = `Your network status is ${navigator.onLine ? "Online ✅" : "Offline ❌"
    } `;
  content.textContent = textContent;
});

$(document).ready(() => {
  $.getJSON("https://api.ipify.org?format=json", function (data) {
    $("#gfg").html(data.ip);
  });
});

$.getJSON("http://ip-api.com/json/?callback=?", function (data) {
  $("#Country").append(data.country);
  $("#City").append(data.city);
});

// var Location = document.getElementById("lat");
// navigator.geolocation.getCurrentPosition(showLocation);

// function showLocation(position) {
//   Location.innerHTML =
//     "Latitude: " +
//     position.coords.latitude +
//     "<br>Longitude: " +
//     position.coords.longitude +
//     "<br>Altitude: " +
//     position.coords.altitude +
//     "<br>Accuracy: " +
//     position.coords.accuracy;
// }

document.onkeydown = function () {
  var key = key || window.event; // for IE to cover IEs window event-object
  if (key.which == 32) {
    location.reload();
  }
};

const perf = () => {
  const $perf = document.querySelector("#load1");

  if ($perf) {
    // Wait for the page to finish loading
    window.addEventListener("load", () => {
      const pageEnd = performance.mark("pageEnd");
      const loadTime = pageEnd.startTime;

      $perf.innerHTML += `Page loaded in ${loadTime}ms.`;
    });
  }
};

perf();

var seconds = 0;
var el = document.getElementById("top");

function incrementSeconds() {
  seconds += 1;
  el.innerText = seconds;
}

var cancel = setInterval(incrementSeconds, 1000);

var one = navigator.hardwareConcurrency;
document.getElementById("cpu").innerHTML = one + ", ";

var two = navigator.deviceMemory;
document.getElementById("ram").innerHTML = two + "gb, ";

var three = navigator.webdriver;
document.getElementById("clip").innerHTML = three;

var five = navigator.languages;
document.getElementById("five").innerHTML = five;

var mtp = navigator.maxTouchPoints;
document.getElementById("mtp").innerHTML = "MTP: " + mtp;

navigator.mediaCapabilities
  .decodingInfo({
    type: "file",
    audio: {
      contentType: "audio/mp3",
      channels: 2,
      bitrate: 132700,
      samplerate: 5200,
    },
  })
  .then((result) => {
    document.getElementById("six").innerHTML = `This configuration is ${result.supported ? "" : "not "
      }supported, `;
    document.getElementById("seven").innerHTML = `${result.smooth ? "" : "not "
      }smooth, and `;
    document.getElementById("eight").innerHTML = `${result.powerEfficient ? "" : "not "
      }power efficient.`;
  });

if ("xr" in window.navigator) {
  document.getElementById("xr").innerHTML = "Yes";
} else {
  document.getElementById("xr2").innerHTML = "No";
}

/*const video = document.querySelector("video");
const constraints = {
  audio: false,
  video: true,
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    const videoTracks = stream.getVideoTracks();
    alert("Got stream with constraints:", constraints);
    alert(`Using video device: ${videoTracks[0].label}`);
    stream.onremovetrack = () => {
      alert("Stream ended");
    };
    video.srcObject = stream;
  })
  .catch((error) => {
    if (error.name === "OverconstrainedError") {
      alert(
        `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
      );
    } else if (error.name === "NotAllowedError") {
      alert(
        "You need to grant this page permission to access your camera and microphone.",
      );
    } else {
      alert(`getUserMedia error: ${error.name}`, error);
    }
  });*/

var nine = navigator.pdfViewerEnabled;
document.getElementById("nine").innerHTML = nine + ", ";

var eleven1 = navigator.appCodeName;
document.getElementById("eleven1").innerHTML = eleven1 + ", ";
var eleven2 = navigator.appName;
document.getElementById("eleven2").innerHTML = eleven2 + ", ";

var eleven3 = navigator.productSub;
document.getElementById("eleven3").innerHTML = eleven3;

if ("application/pdf" in navigator.mimeTypes) {
  const { description, suffixes } = navigator.mimeTypes["application/pdf"];
  document.getElementById(
    "nine2"
  ).innerHTML = `Description: ${description}, Suffix: ${suffixes}`;
}

var canvas = document.createElement("canvas");
var gl;
var debugInfo;
var vendor;
var renderer;

try {
  gl =
    canvas.getContext("webgl", { powerPreference: "high-performance" }) ||
    canvas.getContext("experimental-webgl", {
      powerPreference: "high-performance",
    });
} catch (e) { }

if (gl) {
  debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
}

/*document.body.addEventListener("keydown", function (event) {
  if (event.key === "g") {
    getLocationNow();
    getClip();
  }
});*/

document.getElementById("web").innerHTML = vendor + "<br>";
document.getElementById("web2").innerHTML = renderer;

var wifi1 = navigator.connection.effectiveType;
document.getElementById("wifi1").innerHTML = wifi1 + ", ";

document.getElementById(
  "wifi2"
).innerHTML = `${navigator.connection.downlink}mbps connection`;

document.onkeyup = function () {
  var d = d || window.event; // for IE to cover IEs window event-object
  if (d.which == 68) {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
};

/*
function copyTextdns() {
  navigator.clipboard.writeText("167.89.91.171");
}

function copyTextnio() {
  navigator.clipboard.writeText("https://my.nextdns.io/setup");
}

function copyTextkey() {
  navigator.clipboard.writeText("d49c8d291c9ea626d03803ab57d79dfa");
}*/

var RTCPeerConnection =
  window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

if (RTCPeerConnection)
  (function () {
    var rtc = new RTCPeerConnection({ iceServers: [] });
    if (1 || window.mozRTCPeerConnection) {
      rtc.createDataChannel("", { reliable: false });
    }

    rtc.onicecandidate = function (evt) {
      if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
    };
    rtc.createOffer(
      function (offerDesc) {
        grepSDP(offerDesc.sdp);
        rtc.setLocalDescription(offerDesc);
      },
      function (e) {
        console.warn("offer failed", e);
      }
    );

    var addrs = Object.create(null);
    addrs["0.0.0.0"] = false;
    function updateDisplay(newAddr) {
      if (newAddr in addrs) return;
      else addrs[newAddr] = true;
      var displayAddrs = Object.keys(addrs).filter(function (k) {
        return addrs[k];
      });
      document.getElementById("list").textContent =
        displayAddrs.join(" or ") || "n/a";
    }

    function grepSDP(sdp) {
      var hosts = [];
      sdp.split("\r\n").forEach(function (line) {
        if (~line.indexOf("a=candidate")) {
          var parts = line.split(" "),
            addr = parts[4],
            type = parts[7];
          if (type === "host") updateDisplay(addr);
        } else if (~line.indexOf("c=")) {
          var parts = line.split(" "),
            addr = parts[2];
          updateDisplay(addr);
        }
      });
    }
  })();
else {
  document.getElementById("list").innerHTML =
    '<code>ifconfig | grep inet | grep -v inet6 | cut -d" " -f2 | tail -n1</code>';
  document.getElementById("list").nextSibling.textContent =
    "In Chrome and Firefox your IP should display automatically, by the power of WebRTCskull.";
}

/* horror */

window.onload = (logInfo = true) =>
  new Promise((resolve, reject) => {
    window.RTCPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;

    if (typeof window.RTCPeerConnection == "undefined")
      return reject("WebRTC not supported by browser");

    let pc = new RTCPeerConnection();
    let ips = [];

    pc.createDataChannel("");
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((err) => reject(err));
    pc.onicecandidate = (event) => {
      if (!event || !event.candidate) {
        // All ICE candidates have been sent.
        if (ips.length == 0)
          return reject("WebRTC disabled or restricted by browser");

        return resolve(ips);
      }

      let parts = event.candidate.candidate.split(" ");
      let [base, componentId, protocol, priority, ip, port, , type, ...attr] =
        parts;
      let component = ["rtp", "rtpc"];

      if (!ips.some((e) => e == ip)) ips.push(ip);

      if (!logInfo) return;

      document.getElementById("11").innerHTML = base.split(":")[1];
      document.getElementById("22").innerHTML = component[componentId - 1];
      document.getElementById("33").innerHTML = protocol;
      document.getElementById("44").innerHTML = priority;
      document.getElementById("55").innerHTML = port;
      document.getElementById("66").innerHTML = type;

      if (attr.length) {
        for (let i = 0; i < attr.length; i += 2)
          document.getElementById("88").innerHTML =
            "> " + attr[i] + ": " + attr[i + 1];
      }

      console.log;
    };
  });

/* horror */

fetch("https://jsonip.com", { mode: "cors" })
  .then((resp) => resp.json())
  .then((ip) => {
    document
      .getElementById("ip6")
      .insertAdjacentHTML("beforeend", `${JSON.stringify(ip)}`);
  });

/* horror */

document.getElementById("hostname1").innerHTML =
  ("Hostname:", window.location.origin);
document.getElementById("hostname2").innerHTML =
  ("Hostname:", window.location.host);
document.getElementById("hostname3").innerHTML =
  ("Hostname:", window.location.hostname);
document.getElementById("hostname4").innerHTML =
  ("Hostname:", window.location.protocol);
document.getElementById("hostname5").innerHTML =
  ("Hostname:", window.location.pathname);
document.getElementById("hostname6").innerHTML =
  ("Hostname:", window.location.port);

// api?

const supported = "contacts" in navigator && "ContactsManager" in window;
document.getElementById("cpapi").innerHTML = supported

// SERIAL 

document.body.addEventListener("keydown", function (event) {
  if (event.key === "s") {
    serialP()
  }
});

async function serialP() {

  await navigator.serial.requestPort();
  alert(await navigator.serial.getPorts());

};

// STORAGE

if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(({ usage, quota }) => {
    document.getElementById('esti').innerHTML = (`Using ${usage} out of ${quota} bytes.`);
  });
}

// focus?

window.addEventListener('focus', function() {
  document.getElementById('focus').innerHTML = "Focused"
});

window.addEventListener('blur', function() {
  document.getElementById('focus').innerHTML = "Unfocused"
});

// 

