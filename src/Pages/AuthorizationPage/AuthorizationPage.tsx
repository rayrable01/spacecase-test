import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { loginSchema, loginSchemaType, loginUser } from "../../api/userRequests"
import { queryClient } from "../../api/queryClient"
import { useDispatch } from "react-redux"
import { actions } from "../../store/token/token.slice"
import { zodResolver } from "@hookform/resolvers/zod"


export const AuthorizationPage = () => {
    const {register, handleSubmit, formState: {errors} } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema)
    })
    const dispatch = useDispatch()

    const loginMutation = useMutation({
        mutationFn: ({username, password}: loginSchemaType) => loginUser({username, password}),
        onSuccess: (value) => {
            if (value?.data?.token) {
                console.log(`Component AuthPage: SUCCESS LOGIN`);
                console.warn('Добавлен токен из AuthComponent', dispatch(actions.addToken(value.data.token)))
            } else {
                console.error(`Ошибка авторизации: ${value.error_code}, ${value.error_text}`)
            }
        },
        onError: (error) => {
            console.error("Ошибка авторизации:", error.message);
        } 
    }, queryClient)

    const onSubmit = (data: loginSchemaType) => {
        loginMutation.mutate(data);
    }

    return (
        <Card sx={{minHeight: 400}}>
            <CardContent>
                <Typography variant="h5"> Pryaniky.com</Typography>
                <Typography variant="h5">Требуется авторизация</Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2,}}>
                    <TextField 
                        id="username"
                        required
                        label="LOGIN" 
                        variant="standard"
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username ? errors.username.message : ''}
                    />
                    <TextField 
                        id="password"
                        required 
                        label="PASSWORD" 
                        type="password" 
                        variant="standard"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />
                    <Button 
                        variant="contained" 
                        sx={{backgroundColor: "#242424"}} 
                        type="submit"
                        disabled = {loginMutation.isPending}
                    >
                        {loginMutation.isPending ? <CircularProgress size={24} sx={{color: 'white'}} /> : 'Войти'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}