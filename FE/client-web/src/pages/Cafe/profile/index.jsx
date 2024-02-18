import { Box, Paper, Typography } from "@mui/material"


const ProfilePage = () => {
    return(
        <Box>
             <Typography variant="h1"
        sx={{
            fontSize:'20px',
            marginLeft:5,
            marginBottom:2
        }}
        >Profile</Typography>
        <Box
        sx={{
            height:'1000px',
            marginLeft:5,
            marginRight:5,
            display:"flex",
            flexDirection:'row',
            justifyContent:'space-between'
            }}
        >
           
            <Paper
            sx={{
                bgcolor:'white',
                height:'50%',
                width:'30%'
            }}>

            </Paper>
            <Paper
            sx={{
                bgcolor:'white',
                height:'50%',
                width:'67%'
            }}>

            </Paper>

        </Box>
        </Box>
    )

}

export default ProfilePage