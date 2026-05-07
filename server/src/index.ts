import app from '@/app';

const port = process.env.PORT || 8010;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
