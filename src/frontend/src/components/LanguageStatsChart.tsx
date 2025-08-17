import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { githubService, GitHubLanguageStats } from '../api/githubService';

interface LanguageStatsChartProps {
  languageName: string;
}

const LanguageStatsChart: React.FC<LanguageStatsChartProps> = ({ languageName }) => {
  const [stats, setStats] = useState<GitHubLanguageStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLanguageStats();
  }, [languageName]);

  const loadLanguageStats = async () => {
    try {
      setLoading(true);
      const languageStats = await githubService.getLanguageStats(languageName);
      setStats(languageStats.filter(stat => stat.totalLines > 0));
    } catch (error) {
      console.error('Error loading language stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading {languageName} statistics...</Typography>
        </Box>
      </Paper>
    );
  }

  if (stats.length === 0) {
    return (
      <Paper sx={{ p: 4, mt: 3 }}>
        <Typography>No {languageName} statistics found.</Typography>
      </Paper>
    );
  }

  const chartOptions: Highcharts.Options = {
    chart: { type: 'spline', height: 400 },
    title: { text: `${languageName} Development Progress` },
    xAxis: {
      type: 'datetime',
      title: { text: 'Date' }
    },
    yAxis: {
      title: { text: 'Total Lines of Code' },
      min: 0
    },
    series: [{
      name: 'Lines of Code',
      data: stats.map(stat => [new Date(stat.date).getTime(), stat.totalLines]),
      type: 'spline',
      color: '#2563eb'
    }],
    legend: { enabled: false },
    credits: { enabled: false }
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Box sx={{ height: '400px' }}>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
        Data from public GitHub repositories
      </Typography>
    </Paper>
  );
};

export default LanguageStatsChart;
