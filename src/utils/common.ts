import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

export const sleep = (t) => new Promise((r) => setTimeout(r, t));

export const uploadFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = function () {
      const file = input.files[0];
      resolve(file);
    };
    input.onerror = function (err) {
      reject(err);
    };
  });
};

export const xlsx2Json = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      const data = e.target.result;
      const temp = XLSX.read(data, {
        type: 'binary',
      });
      const result = XLSX.utils.sheet_to_json(temp.Sheets[temp.SheetNames[0]]);
      resolve(result);
    };
  });
};

type Person = {
  language?: string | undefined;
  title?: string | undefined;
  name?: string | undefined;
  position?: string | undefined;
  email?: string | undefined;
  fax?: string | undefined;
  postcode?: string | undefined;
  telephone?: string | undefined;
  mobile?: string | undefined;
  address_first_line?: string | undefined;
  address_second_line?: string | undefined;
};

export function formatData(i: any, language = 'CN'): Person {
  if (language === 'CN') {
    return {
      language: 'CN',
      title: `${i?.name_EN} CN`.toUpperCase(),
      name: i?.name,
      position: i?.position,
      email: i?.email ? `电子邮件: ${i?.email}` : undefined,
      fax: i?.fax ? `传真: ${i?.fax}` : undefined,
      postcode: i?.postcode ? `邮编: ${i?.postcode}` : undefined,
      telephone: i?.telephone ? `电话: ${i?.telephone}` : undefined,
      mobile: i?.mobile ? `手机: ${i?.mobile}` : undefined,
      address_first_line: i?.address_first_line,
      address_second_line: i?.address_second_line,
    } as Person;
  }

  // if (language === 'EN') {
  return {
    language: 'EN',
    title: `${i?.name_EN} EN`.toUpperCase(),
    name: `${i?.name_EN}`.toUpperCase(),
    position: `${i?.position_EN}`.toUpperCase(),
    email: i?.email_EN ? `Email: ${i?.email_EN}` : undefined,
    fax: i?.fax_EN ? `Fax: ${i?.fax_EN}` : undefined,
    // postcode: i?.postcode_EN ? "PostCode: " + i?.postcode_EN : undefined,
    telephone: i?.telephone ? `Tel: ${i?.telephone_EN}` : undefined,
    mobile: i?.mobile_EN ? `Mobile: ${i?.mobile_EN}` : undefined,
    address_first_line: i?.address_first_line_EN,
    address_second_line: i?.address_second_line_EN,
  } as Person;
  // }
}

export const getCanvas = async (str) => {
  const canvas = await html2canvas(document.querySelector(`#${str}`), {
    scale:window.devicePixelRatio * 2,
    dpi: 300,
  });
  return canvas;
};

export function downLoadImage(canvas, name) {
  const a = document.createElement('a');
  a.href = canvas.toDataURL();
  a.download = name;
  a.click();
}

export const randomString = (len = 32) => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZ';
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

// 读取本地excel文件
// function readWorkbookFromLocalFile(file, callback) {
//     var reader = new FileReader();
//     reader.onload = function (e) {
//       var data = e.target.result;
//       var workbook = XLSX.read(data, { type: "binary" });
//       if (callback) callback(workbook);
//     };
//     reader.readAsBinaryString(file);
//   }
