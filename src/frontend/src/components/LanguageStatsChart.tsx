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
      setStats(languageStats.filter(stat => stat.additions > 0 || stat.deletions > 0));
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
      title: { text: 'Cumulative Lines of Code' },
      min: 0
    },
    series: [
      {
        name: 'Additions',
        data: stats.map(stat => [new Date(stat.date).getTime(), stat.additions]),
        type: 'spline',
        color: '#22c55e'
      },
      {
        name: 'Deletions',
        data: stats.map(stat => [new Date(stat.date).getTime(), stat.deletions]),
        type: 'spline',
        color: '#ef4444'
      }
    ],
    legend: { 
      enabled: true,
      align: 'center',
      verticalAlign: 'bottom'
    },
    credits: { enabled: false },
    tooltip: {
      shared: true,
      formatter: function() {
        const date = new Date(this.x as number).toLocaleDateString();
        let tooltip = `<b>${date}</b><br/>`;
        this.points?.forEach(point => {
          tooltip += `<span style="color:${point.series.color}">${point.series.name}</span>: <b>${point.y}</b> lines<br/>`;
        });
        return tooltip;
      }
    }
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
