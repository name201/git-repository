/**
 * esayui通用搜索
 */
$(function() {
	var value="";
	// 自动补全,没用
	$('#inputtable').combobox(
			{
				valueField: 'id',
				textField: 'username',
				//url:'/user/selectLikeUserAll',
				mode: 'remote', //从服务器加载就设置为'remote'
				hasDownArrow: false,  //为true时显示下拉选项图标
				onBeforeLoad: function (parm) {  //在请求加载数据之前触发，返回 false 则取消加载动作
					  	value = $(this).combobox('getValue');
					if (value) {
						parm.username = value;
						return true;
					}
					return false;
				},
			});

	//回车事件绑定 搜索框是esayui动态生成的<input type="text" class="combo-text validatebox-text" autocomplete="off" style="width: 167px; height: 20px; line-height: 20px;">
    $('.combo-text').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
        	//$('#btnSearch').click();
        	reloadgrid();
        }
    });
	// 点击查询按钮
	$('#btnSearch').bind('click', function() {
		reloadgrid();
	});

	// 点击重置按钮
	$('#btnReset').bind('click', function() {
		$('#searchForm').form('clear');
		value="";
	});
	
	function reloadgrid() {
		// 把表单数据转换成json对象
		//var formData = $('#searchForm').serializeJSON();
		$('#grid').datagrid('reload')
		$('#grid').datagrid({
			url : "/user/selectLikeUserAll?username="+value,
			loading : true,
			loadMsg : '数据加载中...',
			fitColumns:true,
			pagination : true,
			fit:true,
			pageNumber : 1,
			pageSize : 50,
			pageList : [ 10, 20, 30, 40, 50 ],
			columns : [ [ {
				field : 'name',
				title : '账号',
				width : 100
			}, {
				field : 'password',
				title : '密码',
				width : 100,
				formatter : function(value) {
					return "*********";
				}
			}, {
				field : 'username',
				title : '真实姓名',
				width : 100
			}, {
				field : 'birthday',
				title : '出生日期',
				width : 100,
				formatter : function(value) {
					return new Date(value).Format("yyyy-MM-dd");
				}
			}, ] ]
		})

	}
})