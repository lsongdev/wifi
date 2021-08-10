import { ready } from 'https://lsong.org/scripts/dom.js';
import { serialize } from 'https://lsong.org/scripts/form.js';

const escape = (v = '') => {
  const needsEscape = ['"', ';', ',', ':', '\\'];
  let escaped = '';
  for (const c of v) {
    if (needsEscape.includes(c)) {
      escaped += `\\${c}`;
    } else {
      escaped += c;
    }
  }
  return escaped;
};

ready(() => {

  form.addEventListener('submit', e => {
    e.preventDefault();
    const wifi = serialize(e.target);
    const ssid = escape(wifi.ssid);
    const password = !wifi.encryption ? '' : escape(wifi.password);
    const sign = `WIFI:T:${wifi.encryption};S:${ssid};P:${password};H:${wifi.hiddenSSID??''};;`;
    // WIFI:T:WPA;S:mobile@lsong.org;P:song940@163.com;H:;;
    console.log(wifi, sign);
    qrcode.src = 'https://api.lsong.one:8443/qr?text=' + sign;

  });
});
