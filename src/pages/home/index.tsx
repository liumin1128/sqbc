import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import BussinessCard from '@/components/BussinessCard';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const renderCanvas = async (render, filename) => {
  const id = randomString();
  const { destroy } = domRender(() => {
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
  destroy();
  await sleep(300);
};

function App() {
  const [current, setCurrent] = useState(0);
  const [percent, setPercent] = useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-shadow,consistent-return
  const handleCreate = async (current: number, list: any[]) => {
    const enData = formatData(list[current], 'EN');
    const cnData = formatData(list[current], 'CN');


    await renderCanvas(
      () => <BussinessCard data={enData} />,
      `${enData.title || enData.name || randomString()}.png`,
    );

    setPercent(((current * 3 + 1) / (list.length * 3)) * 100);

    await renderCanvas(
      () => <BussinessCard data={cnData} />,
      `${cnData.title || cnData.name || randomString()}.png`,
    );

    setPercent(((current * 3 + 2) / (list.length * 3)) * 100);

    await renderCanvas(() => {
      return (
        <div style={{ padding: 8, backgroundColor: '#f8f8f8' }}>
          <BussinessCard data={enData} />
          <div style={{ padding: 4 }} />
          <BussinessCard data={cnData} />
        </div>
      );
    }, `${enData.name || cnData.name || randomString()}.png`);

    setPercent(((current * 3 + 3) / (list.length * 3)) * 100);

    const next = current + 1;
    if (next < list.length) {
      return handleCreate(next, list);
    }
  };

  const handleReset = async () => {
    await sleep(1000)
    setPercent(0)
  };

  const handleUpload = async () => {
    const file = await uploadFile();
    const json = await xlsx2Json(file);
    setPercent(1);
    await handleCreate(0, json);
    await handleReset();
  };

  const handleChange = (e, v: number) => {
    setCurrent(v);
  };

  return (
    <Container>
      <Stack spacing={2} sx={{ py: 4 }}>
        <Typography variant="h3">电子名片生成工具</Typography>


        <Tabs
          value={current}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="CHINESE" id="cn" />
          <Tab label="ENGLISH" id="en" />
        </Tabs>

        {current === 0 && (
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
        )}

        {current === 1 && (
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
        )}

        <Typography>
          第一次打开需要加载字体文件，请等待上面的示例显示完全正常再上传文件模版。
        </Typography>

        <Typography>浏览器可能会弹窗是否允许下载文件，请点击允许。</Typography>

        <Stack direction="row" spacing={2}>
          <Button disabled={percent !== 0} size="large" onClick={handleUpload} variant="contained">
            点击上传模版文件
          </Button>
          {percent !== 0 && <CircularProgressWithLabel value={percent} />}
        </Stack>
      </Stack>
    </Container>
  );
}




export default App;
