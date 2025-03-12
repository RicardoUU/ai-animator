import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress,
  Alert,
  Snackbar,
  Stack,
  Tooltip,
  Divider,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HistoryIcon from '@mui/icons-material/History';
import ApiKeyManager from '../common/ApiKeyManager';
import { useAnimationStore } from '../../store/animationStore';
import { generateAnimationCode, formatPrompt } from '../../services/aiModelService';
import { AIModelType } from '../../types';

const AnimationEditor = () => {
  const theme = useTheme();
  const { 
    userPrompt, 
    setUserPrompt, 
    currentModelType, 
    setCurrentModelType, 
    setCurrentCode, 
    isGenerating, 
    setIsGenerating,
    error,
    setError,
    addToHistory,
    resetState,
    history
  } = useAnimationStore();
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [apiKeys, setApiKeys] = useState<Record<AIModelType, string>>({
    qianwen: '',
    openai: '',
    doubao: '',
    deepseek: ''
  });
  
  // 从本地存储加载API Keys
  useEffect(() => {
    const savedApiKeys = localStorage.getItem('ai_animator_api_keys');
    if (savedApiKeys) {
      try {
        const parsedKeys = JSON.parse(savedApiKeys) as Record<AIModelType, string>;
        setApiKeys(parsedKeys);
      } catch (error) {
        console.error('Failed to parse saved API keys:', error);
      }
    }
  }, []);

  // 处理模型类型变更
  const handleModelTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentModelType(event.target.value as AIModelType);
  };

  // 处理提示词变更
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(event.target.value);
  };

  // 处理生成动画
  const handleGenerateAnimation = async () => {
    if (!userPrompt.trim()) {
      setError('请输入动画描述');
      return;
    }
    
    // 检查当前模型的API Key是否已设置
    const currentApiKey = apiKeys[currentModelType];
    if (!currentApiKey) {
      setError(`请先设置${currentModelType === 'qianwen' ? '千问' : 
                         currentModelType === 'openai' ? 'OpenAI' : 
                         currentModelType === 'doubao' ? '豆包' : 'DeepSeek'} API Key`);
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const formattedPrompt = formatPrompt(userPrompt);
      const response = await generateAnimationCode({
        prompt: formattedPrompt,
        modelType: currentModelType,
        apiKey: currentApiKey
      });
      
      if (response.error) {
        setError(response.error);
      } else {
        setCurrentCode(response.code);
        addToHistory(userPrompt);
        setShowSuccess(true);
      }
    } catch (err) {
      setError(`生成动画时出错: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 处理关闭成功提示
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  // 处理重置状态
  const handleReset = () => {
    resetState();
    setShowSuccess(false);
  };

  // 处理历史记录显示
  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // 从历史记录中选择提示词
  const handleSelectFromHistory = (prompt: string) => {
    setUserPrompt(prompt);
  };

  return (
    <Box sx={{ 
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        flexWrap: 'wrap',
        gap: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AutoAwesomeIcon sx={{ color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            动画编辑器
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="查看历史记录">
            <Button 
              size="small" 
              variant="outlined"
              color="primary" 
              onClick={handleToggleHistory}
              startIcon={<HistoryIcon />}
            >
              历史
            </Button>
          </Tooltip>
          <Tooltip title="重置状态">
            <Button 
              size="small" 
              variant="outlined"
              color="secondary" 
              onClick={handleReset}
              startIcon={<RefreshIcon />}
            >
              重置
            </Button>
          </Tooltip>
          <ApiKeyManager onSaveApiKeys={setApiKeys} />
        </Box>
      </Box>
      
      {showHistory && history.length > 0 && (
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.primary.light, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            历史记录
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {history.slice().reverse().slice(0, 10).map((prompt, index) => (
              <Chip 
                key={index} 
                label={prompt.length > 20 ? `${prompt.substring(0, 20)}...` : prompt} 
                onClick={() => handleSelectFromHistory(prompt)}
                variant="outlined"
                color="primary"
                size="small"
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Box>
      )}
      
      <Box sx={{ 
        p: 3, 
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'background.paper',
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`
      }}>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="model-type-label">选择大模型</InputLabel>
          <Select
            labelId="model-type-label"
            value={currentModelType}
            label="选择大模型"
            onChange={handleModelTypeChange}
          >
            <MenuItem value="qianwen">千问</MenuItem>
            <MenuItem value="openai">OpenAI</MenuItem>
            <MenuItem value="doubao">豆包</MenuItem>
            <MenuItem value="deepseek">DeepSeek</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          multiline
          rows={4}
          label="描述你想要的动画效果"
          placeholder="例如：让元素从左侧滑入并旋转360度"
          value={userPrompt}
          onChange={handlePromptChange}
          variant="outlined"
          disabled={isGenerating}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light
              }
            }
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 2
        }}>
          <Typography variant="caption" color="text.secondary">
            提示：尝试描述元素的移动方向、速度、旋转角度等
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateAnimation}
            disabled={isGenerating || !userPrompt.trim()}
            startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
            sx={{ 
              borderRadius: 6,
              px: 3,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.6)}`
              }
            }}
          >
            {isGenerating ? '生成中...' : '生成动画'}
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            borderRadius: theme.shape.borderRadius
          }}
        >
          {error}
        </Alert>
      )}
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          动画生成成功！
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AnimationEditor;