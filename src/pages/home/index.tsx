import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Snackbar from '@mui/material/Snackbar';
import LinearProgress from '@mui/material/LinearProgress';
// import { makeStyles } from '@mui/material/styles';
import image from '@/assets/images/undraw_online_cv_qy9w.svg';
import BussinessCard from '@/components/BussinessCard';
import Steps from '@/components/Steps';
import {
  uploadFile,
  xlsx2Json,
  formatData,
  getCanvas,
  downLoadImage,
  randomString,
  sleep,
} from '@/utils/common';
import { domRender } from '@/utils/react';
import Typography from '@mui/material/Typography';
// import {
//   sentData2Electron,
//   getDownloadPathFromElectron,
// } from './utils/electron';
// import './App.css';

// const useStyles = makeStyles({
//   media: {
//     paddingTop: '60%',
//     backgroundSize: '60%',
//     backgroundColor: '#789',
//   },
//   template: {
//     marginTop: 12,
//     textDecoration: 'none',
//     color: '#789',
//   },
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

const renderCanvas = async (render, filename) => {
  const id = randomString();
  const { destory } = domRender(() => {
    return (
      <div
        id={id}
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 0,
        }}
      >
        {render()}
      </div>
    );
  });
  await sleep(300);
  const canvas = await getCanvas(id);
  await downLoadImage(canvas, filename);
  destory();
  await sleep(300);
};

// const renderCard = async (data, path) => {
//   const id = randomString();
//   const { destory } = domRender(() => {
//     return (
//       <div id={id} className="hide">
//         <BussinessCard data={data} />
//         <BussinessCard data={data} />
//       </div>
//     );
//   });
//   await sleep(300);
//   const canvas = await getCanvas(id);
//   // downLoadImage(canvas, (data.title || data.name) + ".png");
//   await sentData2Electron(canvas, data, path);
//   destory();

//   await sleep(300);
// };

function App() {
  // const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-shadow,consistent-return
  const handleCreate = async (current: number, list: any[]) => {
    const enData = formatData(list[current], 'EN');
    const cnData = formatData(list[current], 'CN');

    await renderCanvas(() => {
      return (
        <div>
          <BussinessCard data={enData} />
        </div>
      );
    }, `${enData.title || enData.name || randomString()}.png`);

    await renderCanvas(() => {
      return (
        <div>
          <BussinessCard data={cnData} />
        </div>
      );
    }, `${cnData.title || cnData.name || randomString()}.png`);

    await renderCanvas(() => {
      return (
        <div style={{ padding: 8, backgroundColor: '#f8f8f8' }}>
          <BussinessCard data={enData} />
          <div style={{ padding: 4 }} />
          <BussinessCard data={cnData} />
        </div>
      );
    }, `${enData.name || cnData.name || randomString()}.png`);

    console.log(current, list);

    const next = current + 1;
    if (next < list.length) {
      return handleCreate(next, list);
    }
  };

  const handleReset = async () => {
    setProgress(0);
  };

  const handleUpload = async () => {
    await handleReset();
    const file = await uploadFile();
    const json = await xlsx2Json(file);
    // @ts-ignore
    await handleCreate(0, json);
    await handleReset();
  };

  const persent = progress === 0 ? 0 : (progress / (list.length * 3)) * 100;

  return (
    <>
      <Container>
        <Stack spacing={2} sx={{ py :2 }}>

          <Typography variant="h3">
            电子名片生成工具
          </Typography>

          <Typography>
            第一次打开页面需要加载字体文件，请等待下面的示例显示完全正常再上传文件模版
          </Typography>

          <BussinessCard
            data={{
              address_first_line: '中国北京朝阳区建国门外大街2号',
              address_second_line: '北京银泰中心C座43层4303室',
              email: '电子邮件: meimei_han@singaporeair.com.sg',
              fax: '传真: (8610) 1234 5678',
              language: 'CN',
              mobile: '手机: (86) 186 1234 5678',
              name: '韩梅梅',
              position: '人事行政助理',
              postcode: '邮编: 100022',
              telephone: '电话: (8610) 1234 5678',
              title: 'MEIMEI HAN CN',
            }}
          />

          <Box>
            <Button onClick={handleUpload} variant="contained">
              点击上传模版文件
            </Button>
          </Box>
        </Stack>



      </Container>

      {/*
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarVisible}
        autoHideDuration={6000}
        onClose={() => {
          setSnackbarVisible(false);
        }}
        message="All Done"
      />
       */}


      {/*
      <BussinessCard
        data={{
          address_first_line:
            'Unit 4303, 43rd Floor, Beijing Yin Tai Center Tower C,',
          address_second_line:
            'No.2, Jian Guo Men Wai Avenue 2, Beijing 100022 China',
          email: 'Email: meimei_han@singaporeair.com.sg',
          fax: 'Fax: (8610) 8513 1790',
          language: 'EN',
          mobile: 'Mobile: (86) 186 1234 4567',
          name: 'MEIMEI HAN',
          position: 'HUMAN RESOURCES / ADMINISTRATION ASSISTANT',
          telephone: 'Tel: (8610) 1234 5678',
          title: 'MEIMEI HAN EN',
        }}
      />
            */}
    </>
  );
}

export default App;
