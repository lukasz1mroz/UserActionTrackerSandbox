describe('Demo sites for tracking scripts', () => {
    it('should display correct heading', async () => {
        await browser.url(`http://localhost:4000/`);

        await expect($('h1')).toBeExisting();
    });
});

