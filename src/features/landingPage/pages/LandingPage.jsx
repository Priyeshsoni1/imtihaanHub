import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import AppHeader from "../../../components/AppHeader/AppHeader";
// Import your existing AppHeader component

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: "url(/logo-no-background.png)", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
  },
  heroContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: theme.spacing(4),
  },
  features: {
    padding: theme.spacing(8, 0),
  },
  featureCard: {
    maxWidth: 345,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div>
      {/* Header */}
      <AppHeader />

      {/* Hero Section */}
      <Box className={classes.hero}>
        <Box className={classes.heroContent}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to ImtihanHub
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your solution for
          </Typography>
          {/* <Button variant="contained" color="primary">
            Get Started
          </Button> */}
        </Box>
      </Box>

      {/* Features Section */}
      <Container className={classes.features}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Key Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.featureCard}>
              <CardMedia
                component="img"
                alt="Feature 1"
                height="140"
                image="/logo-no-background.png" // Replace with your image path
                title="Feature 1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Feature 1
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description of feature 1.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.featureCard}>
              <CardMedia
                component="img"
                alt="Feature 2"
                height="140"
                image="/logo-no-background.png" // Replace with your image path
                title="Feature 2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Feature 2
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description of feature 2.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.featureCard}>
              <CardMedia
                component="img"
                alt="Feature 3"
                height="140"
                image="/logo-no-background.png" // Replace with your image path
                title="Feature 3"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Feature 3
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Description of feature 3.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            AppName
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Your solution for
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
