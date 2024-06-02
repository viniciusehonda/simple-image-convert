document.addEventListener("DOMContentLoaded", (e) => {

    var inputCard = document.getElementById('input-card');

    inputCard.addEventListener('click', onInputCardClick)
    inputCard.addEventListener('drop', onInputCardDrop)
    inputCard.addEventListener('dragover', onInputCardDragOver)
    inputCard.addEventListener('dragleave', onInputCardDragLeave)

    var fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', onFileChanged)

    var btnConvert = document.getElementById('btn-convert');
    btnConvert.addEventListener('click', onBtnConvertClick)

    var btnDownload = document.getElementById('btn-download');
    btnDownload.addEventListener('click', downloadFile);
})

function onInputCardClick() {
    document.getElementById('file-input').click();
}

function onInputCardDrop(e) {
    e.preventDefault();

    if (!e.dataTransfer.files) {
        alert("Invalid File");
        return;
    }

    var fileInput = document.getElementById('file-input');
    var files = e.dataTransfer.files;
    fileInput.files = files;

    updateFileLabel(e);
}

function onInputCardDragOver(e) {
    e.preventDefault();

    document.getElementById('input-card').classList.add("drag-over");
}

function onInputCardDragLeave(e) {
    e.preventDefault();

    document.getElementById('input-card').classList.remove("drag-over");
}

function onFileChanged(e) {
    e.preventDefault();

    var btnConvert = document.getElementById('btn-convert');
    btnConvert.removeAttribute('disabled');

    const btnDownload = document.getElementById('btn-download');
    btnDownload.style.display = "none";

    updateFileLabel(e);
}

function updateFileLabel(e) {
    var fileInput = document.getElementById('file-input');

    var fileLabel = document.getElementById('file-label');
    fileLabel.innerText = fileInput.files[0].name;
}

function downloadFile(e) {
    e.preventDefault();
    const link = document.getElementById('downloadLink');
    link.click();
}

function onBtnConvertClick(e) {

    e.preventDefault();

    const input = document.getElementById('file-input');
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob(function (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.getElementById('downloadLink');
                    link.download = file.name;
                    link.href = url;
                    const btnDownload = document.getElementById('btn-download');
                    btnDownload.style.display = "block";
                }, 'image/png');
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select a WebP file.');
    }
}