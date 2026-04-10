function createDataTable(
    tableId,
    columns,
    data,
    {
        pageLength = 10,
        lengthMenu = [5, 10, 15, 20],
        tableClass = "cell-border compact stripe",
        useURLParam = false,
        rowCallbackFunc = function(row, data, dataIndex){}
    } = {},
    customColumns = null
) {
    // 1. 确保表格存在并清空可能已有的内容
    const $table = $(`#${tableId}`);
    if ($table.length === 0) {
        console.error(`未找到 id 为 "${tableId}" 的 table 元素`);
        return;
    }

    // 如果已经初始化过，先销毁
    if ($.fn.DataTable.isDataTable($table)) {
        $table.DataTable().destroy();
        $table.empty();
    }

    // 2. 动态生成 thead
    let theadHTML = '<tr>';
    columns.forEach(col => {
        theadHTML += `<th>${col}</th>`;
    });
    theadHTML += '</tr>';
    $table.html('<thead>' + theadHTML + '</thead><tbody></tbody>');

    // 3. 添加类名
    $table.removeClass().addClass(tableClass);

    // 4. 定义 columns 配置（支持对象数组或二维数组）
    const dtColumns = customColumns || columns.map(title => ({ title }));

    // 5. 初始化 DataTable
    const table = $table.DataTable({
        data: data,
        columns: dtColumns,
        rowCallback: rowCallbackFunc,
        paging: true,
        pageLength,
        lengthMenu,
        searching: true,
        info: true,
        ordering: true,
        language: {
            // 可选：中文语言包
            // url: "//cdn.datatables.net/plug-ins/1.13.7/i18n/zh.json"
        }
    });

    // 6. 【可选】URL 参数同步页码
    if (useURLParam) {
        const page = getSearchParam('page', 0);
        if (page !== null && !isNaN(page)) {
            const pageIndex = Math.max(0, parseInt(page, 10) - 1); // 防止负数
            if (table.page.info().pages > pageIndex) {        // 防止超出最大页
                table.page(pageIndex).draw('page');
            }
        }

        // 每次分页后更新 URL
        table.on('draw.dt', function () {
            const info = table.page.info();
            const currentPageIndex = info.page;
            var paramResult = (currentPageIndex == 0)?(""):(currentPageIndex + 1);
            updateSearchParam("page", paramResult);
        });
    }

    return table; // 返回 DataTable 实例，方便后续操作
};

function dataTableImgAutoResize(line_num = 0, minPx = 72, row){
    const jqStr = `td:eq(${line_num}) img`;
    var img = $(jqStr, row);

    if (img.length) {
        var imgSrc = img.attr('src');

        var image = new Image();
        image.onload = function() {
            var originalWidth = image.width;
            var originalHeight = image.height;

            if (originalWidth < minPx || originalHeight < minPx) {
                img.css({
                    'object-fit': 'contain',
                    'image-rendering': 'pixelated'
                });
            }
        };

        image.src = imgSrc;
    }
}