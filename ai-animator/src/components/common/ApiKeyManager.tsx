import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { AIModelType } from '../../types';

interface ApiKeyManagerProps {
  onSaveApiKeys: (apiKeys: Record<AIModelType, string>) => void;
}

// 本地存储键名
const API_KEYS_STORAGE_KEY = 'ai_animator_api_keys';

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({ onSaveApiKeys }) => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<AIModelType>('qianwen');
  const [apiKeys, setApiKeys] = useState<Record<AIModelType, string>>({
    qianwen: '',
    openai: '',
    doubao: '',
    deepseek: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // 从本地存储加载API Keys
  useEffect(() => {
    const savedApiKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (savedApiKeys) {
      try {
        const parsedKeys = JSON.parse(savedApiKeys) as Record<AIModelType, string>;
        setApiKeys(parsedKeys);
      } catch (error) {
        console.error('Failed to parse saved API keys:', error);
      }
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: AIModelType) => {
    setCurrentTab(newValue);
  };

  const handleApiKeyChange = (modelType: AIModelType, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [modelType]: value
    }));
  };

  const handleSave = () => {
    // 保存到本地存储
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(apiKeys));
    
    // 通知父组件
    onSaveApiKeys(apiKeys);
    
    // 显示成功消息
    setShowSuccess(true);
    
    // 关闭对话框
    handleClose();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen} title="API设置">
        <SettingsIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>API Key 设置</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            请为各大模型设置API Key，以便使用相应的AI服务生成动画。API Key将安全地存储在您的浏览器本地存储中。
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={currentTab} onChange={handleTabChange} aria-label="API Key tabs">
              <Tab label="千问" value="qianwen" />
              <Tab label="OpenAI" value="openai" />
              <Tab label="豆包" value="doubao" />
              <Tab label="DeepSeek" value="deepseek" />
            </Tabs>
          </Box>

          <Box sx={{ py: 2 }}>
            {currentTab === 'qianwen' && (
              <TextField
                fullWidth
                label="千问 API Key"
                value={apiKeys.qianwen}
                onChange={(e) => handleApiKeyChange('qianwen', e.target.value)}
                margin="normal"
                type="password"
                placeholder="请输入千问 API Key"
                helperText="请从千问官网获取API Key"
              />
            )}

            {currentTab === 'openai' && (
              <TextField
                fullWidth
                label="OpenAI API Key"
                value={apiKeys.openai}
                onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                margin="normal"
                type="password"
                placeholder="请输入OpenAI API Key"
                helperText="请从OpenAI官网获取API Key"
              />
            )}

            {currentTab === 'doubao' && (
              <TextField
                fullWidth
                label="豆包 API Key"
                value={apiKeys.doubao}
                onChange={(e) => handleApiKeyChange('doubao', e.target.value)}
                margin="normal"
                type="password"
                placeholder="请输入豆包 API Key"
                helperText="请从豆包官网获取API Key"
              />
            )}

            {currentTab === 'deepseek' && (
              <TextField
                fullWidth
                label="DeepSeek API Key"
                value={apiKeys.deepseek}
                onChange={(e) => handleApiKeyChange('deepseek', e.target.value)}
                margin="normal"
                type="password"
                placeholder="请输入DeepSeek API Key"
                helperText="请从DeepSeek官网获取API Key"
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          API Key 保存成功！
        </Alert>
      </Snackbar>
    </>
  );
};

export default ApiKeyManager;