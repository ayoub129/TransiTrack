export const theme = {
  colors: {
    // Brand colors
    primary: '#FF6B00',
    primary600: '#E55F00',
    primary200: '#FFD3B8',
    
    // Text colors
    ink900: '#0F172A',
    ink600: '#475569',
    ink400: '#94A3B8',
    ink200: '#E2E8F0',
    
    // Background colors
    bg0: '#0B0B0C',
    bg100: '#0F1115',
    bg200: '#1E293B',
    white: '#FFFFFF',
    
    // Accent colors
    accent: {
      teal: '#00C2A8',
      danger: '#EF4444',
      warning: '#F59E0B',
      success: '#10B981',
    },
    
    // Semantic colors
    surface: '#FFFFFF',
    surfaceDark: '#1E293B',
    border: '#E2E8F0',
    borderDark: '#334155',
  },
  
  // Border radius
  radii: {
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    full: 9999,
  },
  
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: 34,
      lineHeight: 40,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 28,
      lineHeight: 34,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '600' as const,
    },
    h4: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400' as const,
    },
    bodyMedium: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500' as const,
    },
    caption: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '400' as const,
    },
    captionMedium: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '500' as const,
    },
    small: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400' as const,
    },
  },
  
  // Shadows
  shadows: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    modal: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    floating: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },
  },
  
  // Layout
  layout: {
    headerHeight: 56,
    tabBarHeight: 80,
    buttonHeight: 48,
    inputHeight: 48,
    borderRadius: 16,
  },
} as const;

// Add defensive programming to ensure theme is always available
export const safeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    // Ensure white is always available
    white: theme.colors.white || '#FFFFFF',
  }
};

export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeTypography = typeof theme.typography;
