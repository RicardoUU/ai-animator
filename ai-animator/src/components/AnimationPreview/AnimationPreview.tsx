import { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, IconButton, Slider, Tooltip, Stack, useTheme, alpha } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';
import SpeedIcon from '@mui/icons-material/Speed';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAnimationStore } from '../../store/animationStore';
import CodeExporter from '../common/CodeExporter';

// 动态执行GSAP代码的函数
const executeGSAPCode = (code: string, element: HTMLElement | null, timeScale: number = 1) => {
  if (!element || !code.trim()) return;
  
  try {
    // 清除可能存在的动画
    window.gsap?.killTweensOf(element);
    
    // 完全重置元素样式
    element.style.transform = '';
    element.style.opacity = '1';
    element.style.x = '';
    element.style.y = '';
    element.style.rotation = '';
    element.style.scale = '';
    element.style.filter = '';
    element.style.perspective = '';
    element.style.transformOrigin = '';
    element.style.visibility = 'visible';
    
    // 重置GSAP特定属性
    if (window.gsap) {
      window.gsap.set(element, {
        clearProps: 'all'
      });
    }
    
    // 创建一个函数来执行GSAP代码
    const executeCode = new Function('element', `
      try {
        // 设置全局时间缩放
        if (window.gsap) {
          window.gsap.globalTimeline.timeScale(${timeScale});
        }
        ${code}
      } catch (error) {
        console.error('执行动画代码时出错:', error);
      }
    `);
    
    // 执行代码
    executeCode(element);
    return true; // 返回执行成功标志
  } catch (error) {
    console.error('解析动画代码时出错:', error);
    return false;
  }
};

interface AnimationPreviewProps {
  width?: number | string;
  height?: number | string;
}

const AnimationPreview = ({ width = '100%', height = 300 }: AnimationPreviewProps) => {
  const theme = useTheme();
  const targetRef = useRef<HTMLDivElement>(null);
  const { currentCode } = useAnimationStore();
  const [isPaused, setIsPaused] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  
  // 执行动画
  const runAnimation = (reset: boolean = false) => {
    if (currentCode && targetRef.current) {
      if (reset || isPaused) {
        executeGSAPCode(currentCode, targetRef.current, timeScale);
        setIsPaused(false);
      }
    }
  };
  
  // 暂停动画
  const pauseAnimation = () => {
    if (window.gsap && !isPaused) {
      window.gsap.globalTimeline.pause();
      setIsPaused(true);
    }
  };
  
  // 恢复动画
  const resumeAnimation = () => {
    if (window.gsap && isPaused) {
      window.gsap.globalTimeline.play();
      setIsPaused(false);
    }
  };
  
  // 重置并重新播放动画
  const resetAnimation = () => {
    runAnimation(true);
  };
  
  // 处理速度变化
  const handleSpeedChange = (_event: Event, newValue: number | number[]) => {
    const newSpeed = Array.isArray(newValue) ? newValue[0] : newValue;
    setTimeScale(newSpeed);
    
    // 如果动画正在播放，则应用新速度
    if (window.gsap && !isPaused) {
      window.gsap.globalTimeline.timeScale(newSpeed);
    }
  };
  
  // 切换速度控制显示
  const toggleSpeedControl = () => {
    setShowSpeedControl(!showSpeedControl);
  };
  
  // 打开导出对话框
  const handleOpenExport = () => {
    setShowExportDialog(true);
  };
  
  // 关闭导出对话框
  const handleCloseExport = () => {
    setShowExportDialog(false);
  };
  
  useEffect(() => {
    // 当动画代码变化时执行
    if (currentCode) {
      runAnimation(true);
    }
  }, [currentCode]);
  
  return (
    <Box sx={{ 
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden',
      boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
      border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      height,
      width,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Box sx={{ 
        p: 2, 
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.background.default, 0.5)
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VisibilityIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            动画预览
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="导出代码">
            <IconButton 
              size="small" 
              onClick={handleOpenExport}
              sx={{ 
                color: 'primary.main',
                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
              }}
            >
              <CodeIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 2,
          backgroundColor: alpha(theme.palette.background.default, 0.3),
          backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          position: 'relative'
        }}
      >
        <Box
          id="animationTarget"
          ref={targetRef}
          sx={{
            width: 100,
            height: 100,
            backgroundColor: 'primary.main',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'box-shadow 0.3s ease'
          }}
        >
          Target
        </Box>
      </Box>
      
      <Box sx={{ 
        p: 1.5, 
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`, 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.background.default, 0.5)
      }}>
        <Stack direction="row" spacing={1} alignItems="center">
          {isPaused ? (
            <Tooltip title="播放">
              <IconButton 
                size="small" 
                onClick={resumeAnimation} 
                disabled={!currentCode}
                sx={{ 
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.2) },
                  color: theme.palette.success.main
                }}
              >
                <PlayArrowIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="暂停">
              <IconButton 
                size="small" 
                onClick={pauseAnimation} 
                disabled={!currentCode}
                sx={{ 
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  '&:hover': { backgroundColor: alpha(theme.palette.warning.main, 0.2) },
                  color: theme.palette.warning.main
                }}
              >
                <PauseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          
          <Tooltip title="重置">
            <IconButton 
              size="small" 
              onClick={resetAnimation} 
              disabled={!currentCode}
              sx={{ 
                backgroundColor: alpha(theme.palette.info.main, 0.1),
                '&:hover': { backgroundColor: alpha(theme.palette.info.main, 0.2) },
                color: theme.palette.info.main
              }}
            >
              <ReplayIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="调整速度">
            <IconButton 
              size="small" 
              onClick={toggleSpeedControl}
              sx={{ 
                backgroundColor: showSpeedControl ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.2) },
                color: theme.palette.primary.main
              }}
            >
              <SpeedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {showSpeedControl && (
        <Box sx={{ 
          p: 2, 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.95)
        }}>
          <Typography variant="caption" gutterBottom>
            动画速度: {timeScale}x
          </Typography>
          <Slider
            value={timeScale}
            min={0.1}
            max={3}
            step={0.1}
            onChange={handleSpeedChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value}x`}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`
                }
              }
            }}
          />
        </Box>
      )}
      
      {showExportDialog && (
        <CodeExporter 
          code={currentCode} 
          open={showExportDialog} 
          onClose={handleCloseExport} 
        />
      )}
    </Box>
  );
};

export default AnimationPreview;