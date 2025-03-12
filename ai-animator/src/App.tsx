import { CssBaseline, ThemeProvider, createTheme, Container, Grid, Box, Typography, AppBar, Toolbar, Paper, useMediaQuery } from '@mui/material';
import AnimationEditor from './components/AnimationEditor/AnimationEditor';
import AnimationPreview from './components/AnimationPreview/AnimationPreview';
import TemplateLibrary from './components/TemplateLibrary/TemplateLibrary';

// 创建主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "sans-serif"',
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
});

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* 应用栏 */}
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
            AI-Animator
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* 主内容区 */}
      <Container maxWidth="xl" sx={{ mt: { xs: 2, md: 4 }, mb: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ minHeight: 'calc(100vh - 180px)' }}>
          {/* 左侧区域：动画编辑器和预览 */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
              <AnimationEditor />
            </Paper>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
              <AnimationPreview height={isMobile ? 300 : 400} />
            </Paper>
          </Grid>
          
          {/* 右侧区域：模板库 */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
              <TemplateLibrary />
            </Paper>
          </Grid>
        </Grid>
        
        {/* 页脚 */}
        <Box sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            AI-Animator - 使用大模型将通用语言转化为动画
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
