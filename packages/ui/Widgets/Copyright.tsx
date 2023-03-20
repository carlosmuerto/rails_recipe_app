import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/carlosmuerto/rails_recipe_app">
        Recipe App
      </Link>{' '}
      2023
      {'.'}
    </Typography>
  )
}

export default Copyright
