//Main view code-pageContainer//
 
 "use strict";

    if (!pdfjsLib.getDocument || !pdfjsViewer.PDFPageView) {
      // eslint-disable-next-line no-alert
      alert("Please build the pdfjs-dist library using\n  `gulp dist-install`");
    }
  
    // The workerSrc property shall be specified.
    //
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.js";
  
    // Some PDFs need external cmaps.
    const CMAP_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/cmaps/";
    const CMAP_PACKED = true;
  
    const DEFAULT_URL = "../nmpereira_cv.pdf";
    const PAGE_TO_VIEW = 1;
    const SCALE = 1;
  
    const container = document.getElementById("pageContainer");
  
    const eventBus = new pdfjsViewer.EventBus();
  
    // Loading document.
    const loadingTask = pdfjsLib.getDocument({
      url: DEFAULT_URL,
      cMapUrl: CMAP_URL,
      cMapPacked: CMAP_PACKED,
    });
    loadingTask.promise.then(function (pdfDocument) {
      // Document loaded, retrieving the page.
      return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
        // Creating the page view with default parameters.
        const pdfPageView = new pdfjsViewer.PDFPageView({
          container,
          id: PAGE_TO_VIEW,
          scale: SCALE,
          defaultViewport: pdfPage.getViewport({ scale: SCALE }),
          eventBus,
          // We can enable text/annotations layers, if needed
          textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
          annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        });
        // Associates the actual page with the view, and drawing it
        pdfPageView.setPdfPage(pdfPage);
        return pdfPageView.draw();
      });
    });



    //MOBILE VIEW CODE-the-canvas//

    // If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = '../nmpereira_cv.pdf';


// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.js';


// Asynchronous download of PDF
var loadingTaskmobile = pdfjsLib.getDocument(url);
loadingTaskmobile.promise.then(function(pdf) {
  console.log('PDF loaded');

  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');

    var scale = 1.5;
    var viewport = page.getViewport({
      scale: scale
    });

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.promise.then(function() {
      console.log('Page rendered');
    });
  });
}, function(reason) {
  // PDF loading error
  console.error(reason);
});
