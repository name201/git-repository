/*m默认加载*/
$(function() {

	loadTree();

	// 添加菜单数据对话框
	$('#insertDlg').dialog({
		title : '添加数据',
		width : 360,
		height : 200,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				insertData();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#insertDlg").dialog('close');
			}
		} ]
	});

	// 添加菜单数据对话框
	$('#insertDlg2').dialog({
		title : '添加数据',
		width : 360,
		height : 200,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				insertData2();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#insertDlg2").dialog('close');
			}
		} ]
	});




	// 添加数据对话框
	$('#insertDlg1').dialog({
		title : '添加数据',
		width : 360,
		height : 300,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				insertData1();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#insertDlg1").dialog('close');
			}
		} ]
	});
	// 修改数据对话框
	$('#updateDlg1').dialog({
		title : '修改数据',
		width : 400,
		height : 260,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				updateData1();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#updateDlg1").dialog('close');
			}
		} ]
	});
	// 修改菜单对话框
	$('#updateDlg').dialog({
		title : '修改数据',
		width : 400,
		height : 260,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				updateData();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#updateDlg").dialog('close');
			}
		} ]
	});

	// 右键菜单
	$('#mm').menu({
		onClick : function(item) {
			//var rowData = $('#grid').datagrid('getData').rows[0];
			var rowData = $('#tt').tree('getSelected');
			switch (item.text) {
			case '添加':
				// 获取当前被选中的节点
				var selected = $('#tt').tree('getSelected');
				var level = selected.icon;

				if (level==1){
					alert("aaa")
					$("#insertDlg2").dialog('open');
					$('#insertDlg2').form('load', rowData);
				}
				if(level==2){
					$.messager.alert("提示", "该菜单目录暂时不支持三级以上的菜单", 'warning');
				}
				if(level==0){
					$("#insertDlg").dialog('open');
					$('#insertDlg').form('load', rowData);
				}
				break;

			case '修改':
				$("#updateDlg").dialog('open');
				// 填充后台数据
				if (rowData.is_parent == 1) {
					rowData.is_parent = '是';
				} else if (rowData.is_parent == 0) {
					rowData.is_parent = '否';
				}
				$('#updateForm').form('load', rowData);
				break;

	/*		case '重命名':
				$("#renameDlg").dialog('open');
				// 填充后台数据
				$('#renameForm').form('load', rowData);
				break;*/

			case '删除':
				deleteData(rowData.id);
				break;
			}
		}
	});
	// 菜单重命名
	/*$('#renameDlg').dialog({
		title : '菜单重命名',
		width : 250,
		height : 100,
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : function() {
				// 访问后台数据
				renameMenu();
			}
		}, {
			text : '关闭',
			handler : function() {
				// 关闭对话框
				$("#renameDlg").dialog('close');
			}
		} ]
	});*/
});

/**
 * 从控制层访问,加载左侧三级菜单的数据
 */
function loadTree() {
	$.ajax({
		type : 'POST',
		url : '/menu1',
		dataType : 'json',
		success : function(rtn) {
			disposeTree(rtn);
		}
	});
}
/**
 * 处理左侧菜单,鼠标右键事件
 */
function disposeTree(data) {
	// 加载左侧菜单
	$('#tt').tree({
		data : data,
		//鼠标右键事件
		onContextMenu : function(e, node) {
			e.preventDefault();
			//var rowData = $('#grid').datagrid('getSelected')[0];
			var rowData = $('#tt').tree('getSelected');
			if (rowData != null) {
				// 找到菜单项
				var item = $('#mm').menu('findItem', '删除');
				if (1 == rowData.is_parent) {
					if (item) {
						// 移除菜单项
						alert(rowData.id)
						$('#mm').menu('removeItem', item.target);

					}
				} else {
					if (item == null) {
						// 追加一个顶部菜单
						$('#mm').menu('appendItem', {
							text : '删除',
							iconCls : 'icon-cut',
							onclick : function(item) {
								//alert(rowData.id)
								deleteData(rowData.id);
							}
						});
					}
				}
				// 显示快捷菜单
				$('#mm').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			} else {
				$.messager.alert("提示", "请选中后操作", 'warning');
			}
		},
		/*加载页面点击数据*/
		onClick : function(node) {
			// 根据菜单id查询数据
			loadDataGrid(node.id);
		}
	});
}

/**
 * 加载表格数据 menuid：菜单id
 */

/*$('#grid').datagrid("getPanel").hide();*/
/*表格头的标题*/
var pageSize="";
function loadDataGrid(id1) {

	$('#grid').datagrid({
		url : '/demo?menuId='+id1,
		loading : true,
		loadMsg : '数据加载中...',
		fitColumns:true,
		pagination : true,
		fit:true,
		pageNumber : 1,
		pageSize : 50,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [ [ /*{
			field : 'id',
			title : '主键',
			width : 100
		},*/ {
			field : 'name1',
			//title : '指标01',
			fit:true,
			width:300
		}, {
			field : 'name2',
			//title : '指标02',
			fit:true,
			width:300
		}, {
			field : 'name3',
			//title : '指标03',
			fit:true,
			width:300
		}, {
			field : 'name4',
			//title : '指标04',
			fit:true,
			width:300
		},{
			field : 'name5',
			//title : '指标05',
			fit:true,
			width:300
		},/*{
			field : 'menuId',
			title : '菜单',
			width : 100,
			formatter : function(value, rowData, index) {
				if (rowData.menuId == 0) {
					return '一级菜单';
				} else if (rowData.menuId == 1){
					return '二级菜单';
				}else {
					return '三级菜单';
				}
			}
		}*/
		/*	{
			field : 'children',
			title : '上级菜单编号',
			width : 100,
		}, {
			field : 'is_parent',
			title : '是否为父菜单',
			width : 100,
			formatter : function(value, rowData, index) {
				if (rowData.is_parent == 1) {
					return '是';
				} else {
					return '否';
				}
			}
		} */
		] ],
		loading : true,
		striped : true,
		rownumbers : true,
		singleSelect : true
	});

	var method = "";
	var listParam = "";
	var saveParam = "";
	$('#grid').datagrid({
		//url : '/demo?menuId='+id1,

		toolbar : [ {
			iconCls : 'icon-add',
			//右边数据表的按钮
			text : '添加',
			handler : function() {
				// 打开添加窗口
				//$("#insertDlg1").dialog('open');
				var rowData = $('#tt').tree('getSelected');
				if(null==rowData){
					//alert("请先点击菜单,再添加表单数据")
					$.messager.alert("提示", "请先点击菜单,再添加表单数据", 'error');
				}else {
					$('#grid').datagrid('reload');

			/*		$(".insertDlg1").each(function(){
						$(this).dialog("destroy", false);
					});*/
					$("#insertDlg1").dialog('open');

				}
			}
		},
			'-', {
			iconCls : 'icon-edit',
				//右边数据表的按钮
			text : '修改',
			handler : function() {
				var rowData = $('#grid').datagrid('getSelected');
				//var rowData = $('#tt').tree('getSelected');
				if (null != rowData) {
					// 打开修改窗口
					$('#updateDlg1').dialog('open');

					$('#updateForm1').form('load', rowData);
				} else {
					$.messager.alert("提示", "请选中要修改的行", 'error');
				}
			}
		},
			'-', {
			iconCls : 'icon-cut',
				//右边数据表的按钮
			text : '删除',
			handler : function() {
				// 删除
				var rowData = $('#grid').datagrid('getSelected');
				//var rowData = $('#tt').tree('getSelected');
				if (null != rowData) {

					deleteData1(rowData.id);

				} else {
					$.messager.alert("提示", "请选中要删除数据", 'error');
				}
			}
		},
			'-',{
			iconCls : 'icon-excel',
			//右边数据表的按钮
			text : '导出',
			handler : function() {
				var rowData = $('#tt').tree('getSelected');

				if (null != rowData) {

					exportData(rowData.id);

				} else {
					$.messager.alert("提示", "请选中要导出的表单", 'error');
				}

			}
		},'-',{
				text : '导入',
				iconCls : 'icon-save',
				handler : function() {
					var rowData = $('#tt').tree('getSelected');

					if (null != rowData) {

						$('#importDlg').dialog('open');

					} else {
						$.messager.alert("提示", "请选中要导入的菜单", 'error');
					}
				}
			}],
		onDblClickRow : function(rowIndex, rowData) {
			// 打开修改窗口
			$('#updateDlg1').dialog('open');
			// 填充后台数据
			if (rowData.is_parent == 1) {
				rowData.is_parent = '是';
			} else if (rowData.is_parent == 0){
				rowData.is_parent = '否';
			}
			$('#updateForm1').form('load', rowData);
		}
	});
}

$(function() {
var importForm = document.getElementById('importForm');
if (importForm) {
	$('#importDlg').dialog(
		{
			title : '导入数据',
			width : 330,
			height : 106,
			modal : true,
			closed : true,
			buttons : [ {
				text : '导入',
				handler : function() {
					// 判断是否有导入的功能
					var rowData = $('#tt').tree('getSelected')
					// 提交添加数据的表单
					var formData = $('#insertForm1').serializeJSON();
					//formData.menuId = rowData.id;
					var menuId = rowData.id;
					$.ajax({
						//url : "/import" ,
						url : "/import?menuId="+ menuId,
						data : new FormData($('#importForm')[0]),
						type : 'post',
						processData : false,
						contentType : false,
						dataType : 'json',
						success : function(data) {
							$.messager.alert('提示', data.msg,
								'info', function() {
									if (data.status==200) {
										$('#importDlg').dialog('close');
										$('#importForm').form('clear');
										$('#grid').datagrid('reload');
									}
								});
						}
					});
				}
			} ]
		});
	}
});
/**
 * 导出表单数据
 */
function exportData(id) {
	var gridData = $('#tt').tree('getSelected');
	$.messager.confirm('提示', '确认要导出 “' + gridData.text + '”的数据吗?',function(r) {
		if (r) {
			window.location.href = "/excelExport?menuId="+id
		}
	});


}

/**
 * 添加菜单数据
 */
function insertData() {
	//var rowData = $('#grid').datagrid('getData').rows[0];
	var rowData = $('#tt').tree('getSelected');
	// 提交添加数据的表单
	var formData = $('#insertForm').serializeJSON();
	if(formData.icon==0) {
		formData.parentId = 0;
	}else{
		formData.parentId = rowData.id;
	}
	//alert(rowData.icon),防止三级菜单,生成
	if (rowData.icon==1){
		formData.icon = 2;

	}

	$.ajax({
		type : 'POST',
		url : '/insertById',
		data : formData,
		dataType : 'json',
		success : function(data) {

			$.messager.alert("提示", data.msg,'info', function() {
				if (data.status == 200) {
					// 刷新表格数据
					$('#grid').datagrid('reload');
					// 刷新树形菜单 data.status
					loadTree();
					// 关闭对话框
					$('#insertDlg').dialog('close');
					// 清除表单数据
					$('#insertForm').form('clear');
				}
			});
		}
	});
}

/**
 * 添加菜单数据2
 */
function insertData2() {
	//var rowData = $('#grid').datagrid('getData').rows[0];
	var rowData = $('#tt').tree('getSelected');
	// 提交添加数据的表单
	var formData = $('#insertForm2').serializeJSON();
	if(formData.icon==0) {
		formData.parentId = 0;
	}else{
		formData.parentId = rowData.id;
	}
	//alert(rowData.icon),防止三级菜单,生成
	if (rowData.icon==1){
		formData.icon = 2;

	}

	$.ajax({
		type : 'POST',
		url : '/insertById',
		data : formData,
		dataType : 'json',
		success : function(data) {

			$.messager.alert("提示", data.msg,'info', function() {
				if (data.status == 200) {
					// 刷新表格数据
					$('#grid').datagrid('reload');
					// 刷新树形菜单 data.status
					loadTree();
					// 关闭对话框
					$('#insertDlg2').dialog('close');
					// 清除表单数据
					$('#insertForm2').form('clear');
				}
			});
		}
	});
}

/**
 * 删除菜单数据
 */
function deleteData(id) {
	//var gridData = $('#grid').datagrid('getData').rows[0];
	var gridData = $('#tt').tree('getSelected');
												//“' + gridData.name1 + '”
	$.messager.confirm('警告', '确认要删除 “' + gridData.text + '”菜单吗?',function(r) {
				if (r) {
					$.ajax({
						type : 'POST',
						url : '/delete1',
						data : {
							'id' : id
						},
						dataType : 'json',
						success : function(data) {
							$.messager.alert("提示", data.msg, 'info',function() {
								if (data.status == 200) {
									// 刷新表格数据
									//$('#grid').datagrid('deleteRow', 0);
									//loadDataGrid();
									// 刷新树形菜单
									loadTree();
								}
							});
						}
					});
				}
			});
}

/**
 * 修改菜单数据
 */
function updateData() {
	var formData = $('#updateForm').serializeJSON();
	$.ajax({
		type : 'POST',
		url : '/updateById',
		data : formData,
		dataType : 'json',
		success : function(data) {
			$.messager.alert("提示", data.msg, 'info', function() {
				if (data.status == 200) {
				// 刷新表格数据
				$('#grid').datagrid('reload');
				// 刷新树形菜单
				loadTree();
				// 关闭对话框
				$('#updateDlg').dialog('close');
				// 清除表单数据
				$('#updateForm').form('clear');
				}
			});
		}
	});
}
/**
 * 重命名菜单
 */
/*
function renameMenu() {
	var formData = $('#renameForm').serializeJSON();
	formData.menuid = $('#tt').tree('getSelected').id;
	$.ajax({
		type : 'POST',
		url : 'menu/menuupdateById',
		data : formData,
		dataType : 'json',
		success : function(data) {
			$.messager.alert("提示", data.msg, 'info', function() {
				if (data.status == 200) {
					// 刷新表格数据
					$('#grid').datagrid('reload');
					// 刷新树形菜单
					loadTree();
					// 关闭对话框
					$('#renameDlg').dialog('close');
					// 清除表单数据
					$('#renameForm').form('clear');
				}
			});
		}
	});
}
*/

/**
 * 添加表单数据
 */
function insertData1() {
	//var rowData = $('#grid').datagrid('getData').rows[0];
	var rowData = $('#tt').tree('getSelected')
	// 提交添加数据的表单
	var formData = $('#insertForm1').serializeJSON();
	formData.menuId = rowData.id;
	//formData.is_parent = rowData.is_parent;
	$.ajax({
		type : 'POST',
		url : '/insertDemoById',
		data : formData,
		dataType : 'json',
		success : function(data) {
			$.messager.alert("提示", data.msg,'info', function() {
				if (data.status == 200) {
					// 刷新表格数据
					$('#grid').datagrid('reload');
					// 刷新树形菜单 data.status
					loadTree();
					// 关闭对话框
					$('#insertDlg1').dialog('close');
					// 清除表单数据
					$('#insertForm1').form('clear');
				}
			});
		}
	});
}

/**
 * 删除表单数据
 */
function deleteData1(id) {
	//var gridData = $('#grid').datagrid('getData').rows[0];
	//var gridData = $('#tt').tree('getSelected');
	//“' + gridData.name1 + '”
	$.messager.confirm('警告', '确认要删除 菜单吗?',function(r) {
		if (r) {
			$.ajax({
				type : 'POST',
				url : '/deleteDemoById',
				data : {
					'id' : id
				},
				dataType : 'json',
				success : function(data) {
					$.messager.alert("提示", data.msg, 'info',function() {
						if (data.status == 200) {
							// 刷新表格数据
							//$('#grid').datagrid('deleteRow', 0);
							//loadDataGrid();
							// 刷新表格数据
							$('#grid').datagrid('reload');
							// 刷新树形菜单
							loadTree();
						}
					});
				}
			});
		}
	});
}

/**
 * 修改表单数据
 */
function updateData1() {
	//alert("修改菜单")
	var formData = $('#updateForm1').serializeJSON();
	$.ajax({
		type : 'POST',
		url : '/updateDemoById',
		data : formData,
		dataType : 'json',
		success : function(data) {
			$.messager.alert("提示", data.msg, 'info', function() {
				if (data.status == 200) {
					// 刷新表格数据
					$('#grid').datagrid('reload');
					// 刷新树形菜单
					loadTree();
					// 关闭对话框
					$('#updateDlg1').dialog('close');
					// 清除表单数据
					$('#updateForm1').form('clear');
				}
			});
		}
	});
}