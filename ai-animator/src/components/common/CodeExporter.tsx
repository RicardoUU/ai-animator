import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Typography,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import { ExportFormat } from '../../types';
import { useAnimationStore } from '../../store/animationStore';

// 代码高亮样式
const codeBlockStyle = {
  backgroundColor: '#f5f5f5',
  padding: '16px',
  borderRadius: '4px',
  overflowX: 'auto',
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '14px',
  lineHeight: 1.5,
  whiteSpace: 'pre-wrap',
  maxHeight: '400px',
  overflowY: 'auto',
};

interface CodeExporterProps {
  open: boolean;
  onClose: () => void;
}

const CodeExporter: React.FC<CodeExporterProps> = ({ open, onClose }) => {
  const { currentCode } = useAnimationStore();
  const [exportFormat, setExportFormat] = useState<ExportFormat>('js');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // 处理导出格式变更
  const handleFormatChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setExportFormat(event.target.value as ExportFormat);
  };

  // 复制代码到剪贴板
  const handleCopyCode = () => {
    navigator.clipboard.writeText(getFormattedCode())
      .then(() => {
        setShowCopySuccess(true);
      })
      .catch((error) => {
        console.error('复制代码失败:', error);
      });
  };

  // 关闭复制成功提示
  const handleCloseCopySuccess = () => {
    setShowCopySuccess(false);
  };

  // 根据选择的格式生成代码
  const getFormattedCode = (): string => {
    switch (exportFormat) {
      case 'js':
        return formatAsJS(currentCode);
      case 'html':
        return formatAsHTML(currentCode);
      case 'react':
        return formatAsReact(currentCode);
      default:
        return currentCode;
    }
  };

  // 格式化为纯JS代码
  const formatAsJS = (code: string): string => {
    return `// GSAP Animation Code
// 确保已引入GSAP库: https://greensock.com/gsap/
// CDN: <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>

${code}`;
  };

  // 格式化为HTML文件
  const formatAsHTML = (code: string): string => {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GSAP Animation</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f5f5f5;
    }
    #animationTarget {
      width: 100px;
      height: 100px;
      background-color: #3f51b5;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div id="animationTarget">Target</div>

  <script>
    // 动画代码
    ${code}
  </script>
</body>
</html>`;
  };

  // 格式化为React组件
  const formatAsReact = (code: string): string => {
    return `import { useEffect, useRef } from 'react';
// 确保已安装GSAP: npm install gsap
import gsap from 'gsap';

const AnimationComponent = () => {
  const targetRef = useRef(null);
  
  useEffect(() => {
    // 确保元素已加载
    if (targetRef.current) {
      // 清除可能存在的动画
      gsap.killTweensOf(targetRef.current);
      
      // 动画代码
      ${code.replace(/"#animationTarget"/g, 'targetRef.current')}
    }
    
    // 清理函数
    return () => {
      if (targetRef.current) {
        gsap.killTweensOf(targetRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={targetRef}
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#3f51b5',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold'
      }}
    >
      Target
    </div>
  );
};

export default AnimationComponent;`;
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <CodeIcon sx={{ mr: 1 }} />
            导出动画代码
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="export-format-label">导出格式</InputLabel>
              <Select
                labelId="export-format-label"
                value={exportFormat}
                label="导出格式"
                onChange={handleFormatChange}
              >
                <MenuItem value="js">GSAP JavaScript</MenuItem>
                <MenuItem value="html">完整HTML文件</MenuItem>
                <MenuItem value="react">React组件</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Typography variant="subtitle2" gutterBottom>
            {exportFormat === 'js' ? 'GSAP JavaScript 代码' : 
             exportFormat === 'html' ? 'HTML 文件代码' : 'React 组件代码'}
          </Typography>
          
          <Paper variant="outlined" sx={{ position: 'relative' }}>
            <Box sx={codeBlockStyle}>
              <pre>{getFormattedCode()}</pre>
            </Box>
            <Tooltip title="复制代码">
              <IconButton 
                onClick={handleCopyCode} 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                size="small"
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Paper>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {exportFormat === 'js' && '将此代码添加到您的JavaScript文件中，确保已引入GSAP库。'}
              {exportFormat === 'html' && '将此代码保存为.html文件，可直接在浏览器中打开。'}
              {exportFormat === 'react' && '将此代码保存为React组件文件，确保已安装GSAP依赖。'}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>关闭</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar 
        open={showCopySuccess} 
        autoHideDuration={3000} 
        onClose={handleCloseCopySuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseCopySuccess} severity="success" sx={{ width: '100%' }}>
          代码已复制到剪贴板
        </Alert>
      </Snackbar>
    </>
  );
};

export default CodeExporter;