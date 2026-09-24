document.addEventListener("DOMContentLoaded", () => {
    const progress = document.querySelector(".progress");

    const updateProgress = () => {
        if (!progress) return;

        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const percentage = documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    document.querySelectorAll("[data-share]").forEach((button) => {
        button.addEventListener("click", async () => {
            const shareData = {
                title: document.title,
                url: window.location.href
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                    return;
                }

                await navigator.clipboard.writeText(window.location.href);
                showMessage(button, "Link copied!");
            } catch (error) {
                console.log("Share cancelled or unavailable.", error);
            }
        });
    });

    document.querySelectorAll("[data-copy-link]").forEach((button) => {
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showMessage(button, "Link copied!");
            } catch (error) {
                console.log("Could not copy the link.", error);
            }
        });
    });

    function showMessage(button, message) {
        const originalText = button.textContent;
        button.textContent = message;

        setTimeout(() => {
            button.textContent = originalText;
        }, 1500);
    }
});
