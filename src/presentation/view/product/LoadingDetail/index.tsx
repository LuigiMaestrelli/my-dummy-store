import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function ProductDetailView() {
  return (
    <Container maxWidth="xl">
      <Card
        sx={{
          padding: 1,
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                marginLeft: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}
              >
                <Typography
                  variant="h1"
                  sx={{ fontSize: 22, fontWeight: 'bold', marginBottom: 2 }}
                >
                  <Skeleton variant="text" />
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body2">
                    <Skeleton variant="text" />
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="body2">
                      <Skeleton variant="text" />
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <Skeleton variant="text" />
                </Typography>

                <Typography
                  variant="h2"
                  sx={{ fontSize: 30, alignSelf: 'flex-end', marginTop: 2 }}
                >
                  <Skeleton variant="text" />
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
