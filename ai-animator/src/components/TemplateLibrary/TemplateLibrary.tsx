import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Chip, 
  TextField, 
  InputAdornment,
  useTheme,
  alpha,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import { useAnimationStore } from '../../store/animationStore';
import { getAllTemplates, getAllCategories, getTemplateById } from '../../services/templateService';
import { AnimationTemplate } from '../../types';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';

const TemplateLibrary = () => {
  const theme = useTheme();
  const [templates, setTemplates] = useState<AnimationTemplate[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    setCurrentCode, 
    setSelectedTemplateId,
    selectedTemplateId
  } = useAnimationStore();

  // 加载模板和类别
  useEffect(() => {
    const allTemplates = getAllTemplates();
    setTemplates(allTemplates);
    
    const allCategories = getAllCategories();
    setCategories(allCategories);
  }, []);

  // 处理模板选择
  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (template) {
      setCurrentCode(template.code);
      setSelectedTemplateId(templateId);
    }
  };

  // 处理类别筛选
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // 处理搜索
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 筛选模板
  const filteredTemplates = templates.filter(template => {
    // 类别筛选
    const categoryMatch = selectedCategory ? template.category === selectedCategory : true;
    
    // 搜索筛选
    const searchLower = searchQuery.toLowerCase();
    const searchMatch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchLower) || 
      template.description.toLowerCase().includes(searchLower);
    
    return categoryMatch && searchMatch;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        mb: 2
      }}>
        <CollectionsIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          动画模板库
        </Typography>
      </Box>
      
      {/* 搜索框 */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="搜索模板..."
        value={searchQuery}
        onChange={handleSearchChange}
        margin="normal"
        size="small"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      
      {/* 类别筛选 */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 1.5, 
          mb: 2, 
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: theme.shape.borderRadius
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
          分类
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleCategorySelect(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              size="small"
              sx={{ 
                mb: 0.5,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: selectedCategory === category ? 2 : 0
                }
              }}
            />
          ))}
        </Stack>
      </Paper>
      
      {/* 模板网格 */}
      <Box sx={{ 
        mt: 2,
        height: '100%',
        maxHeight: 'calc(100vh - 350px)',
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: alpha(theme.palette.background.default, 0.5),
        }
      }}>
        <Grid container spacing={2}>
          {filteredTemplates.map(template => (
            <Grid item xs={12} sm={6} key={template.id}>
              <Card 
                elevation={0}
                sx={{
                  border: `1px solid ${selectedTemplateId === template.id ? 
                    theme.palette.primary.main : 
                    alpha(theme.palette.divider, 0.2)}`,
                  borderRadius: theme.shape.borderRadius,
                  transition: 'all 0.3s ease',
                  backgroundColor: selectedTemplateId === template.id ? 
                    alpha(theme.palette.primary.main, 0.05) : 
                    'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 6px 16px ${alpha(theme.palette.common.black, 0.08)}`,
                    borderColor: alpha(theme.palette.primary.main, 0.5)
                  }
                }}
              >
                <CardActionArea onClick={() => handleTemplateSelect(template.id)}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography 
                      variant="subtitle1" 
                      component="div"
                      sx={{ 
                        fontWeight: 500,
                        mb: 0.5,
                        color: selectedTemplateId === template.id ? 
                          'primary.main' : 'text.primary'
                      }}
                    >
                      {template.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: '40px'
                      }}
                    >
                      {template.description}
                    </Typography>
                    <Chip 
                      label={template.category} 
                      size="small" 
                      variant="outlined"
                      color="primary"
                      sx={{ 
                        height: '22px',
                        fontSize: '0.7rem'
                      }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {filteredTemplates.length === 0 && (
          <Box sx={{ 
            py: 6, 
            textAlign: 'center',
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            borderRadius: theme.shape.borderRadius,
            border: `1px dashed ${alpha(theme.palette.divider, 0.3)}`
          }}>
            <Typography variant="body1" color="text.secondary">
              没有找到匹配的模板
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TemplateLibrary;