
export default parseData = (base64) => {
    //Convert from base 64 to byte array
    var binary_string = atob(base64);
    var len = binary_string.length;
    var data = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        data[i] = binary_string.charCodeAt(i);
    }

    var t_vcnlCurrent = data[0];
    var t_bpm = data[1];
    var t_skinTemp = data[2];
    var t_accelX;
    data[3] & 0x80
        ? (t_accelX = data[3])
        : (t_accelX = -((~data[3] & 0xff) + 1)); //Two's complement
    var t_ibi = (data[5] << 8) + data[4];
    var t_pamp = (data[7] << 8) + data[6];
    var t_damp = (data[9] << 8) + data[8]; // data[8];
    var t_ppg = (data[11] << 8) + data[10];
    var t_dif;
    data[13] & 0x80
        ? (t_dif = (data[13] << 8) + data[12])
        : (t_dif = -((~((data[13] << 8) + data[12]) & 0x80) + 1)); //Two's complement
    var t_digOut = data[14];
    var t_currTime =
        ((data[18] << 24) + (data[17] << 16) + (data[16] << 8) + data[15]) *
        9.846e-6;
    var deltaT = t_currTime - this.time;

    var stats = [
        t_currTime.toFixed(3),
        t_bpm,
        t_ibi
    ]
    
    console.log('stats',stats)
}

const atob = (input = '') => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = input.replace(/[=]+$/, '');
    let output = '';
  
    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded.",
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }
  
    return output;
};


