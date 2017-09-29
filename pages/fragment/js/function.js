function choosetype(){
    
        $("#fragmentModal").modal();
        
    
}




function drag(ev){
    console.log(ev);
    console.log(ev.target.id);
    ev.dataTransfer.setData("fragment",ev.target.id);
//    console.log(ev.dataTransfer.getData("fragment"));
}

function allowDrop(ev)
{
    ev.preventDefault();
}

function dropFacet1fragment(ev,id)
{
//    console.log(id);
    ev.preventDefault();
    var data=ev.dataTransfer.getData("fragment");
//    console.log(data);
    var array_facet=id.split("_");
    var array_id=data.split("_");
    var termName=array_facet[0];
    var facetName=array_facet[1];
    var fragment=array_id[0];
    console.log(fragment);

    
       $.ajax({
             type: "GET",
             url: ip+"/SpiderAPI/addFacetFragment",
             data: {ClassName:nowOperateClass,TermName:termName,FacetName:facetName,FacetLayer:1,FragmentID:fragment},
             dataType: "json",
             async:false,
             success: function(data){
                         alert(data.success);
                      }
         }); 
    
    

    
}


function dropFacet2fragment(ev,id)
{
//    console.log(id);
    ev.preventDefault();
    var data=ev.dataTransfer.getData("fragment");
    console.log(data);
    var array_facet=id.split("_");
    var array_id=data.split("_");
    var termName=array_facet[0];
    var facetName=array_facet[2];
    var fragment=array_id[0];


       $.ajax({
             type: "GET",
             url: ip+"/SpiderAPI/addFacetFragment",
             data: {ClassName:nowOperateClass,TermName:termName,FacetName:facetName,FacetLayer:2,FragmentID:fragment},
             dataType: "json",
             async:false,
             success: function(data){
                         alert(data.success);
                      }
         }); 
    

    
}



function dropFacet3fragment(ev,id)
{
//    console.log(id);
    ev.preventDefault();
    var data=ev.dataTransfer.getData("fragment");
    console.log(data);
    var array_facet=id.split("_");
    var array_id=data.split("_");
    var termName=array_facet[0];
    var facetName=array_facet[3];
    var fragment=array_id[0];


       $.ajax({
             type: "GET",
             url: ip+"/SpiderAPI/addFacetFragment",
             data: {ClassName:nowOperateClass,TermName:termName,FacetName:facetName,FacetLayer:3,FragmentID:fragment},
             dataType: "json",
             async:false,
             success: function(data){
                         alert(data.success);
                      }
         }); 


    
}


//杨宽添加，显示分面树函数
//显示完整的一棵树（树干、树枝、树叶）
function displayTree(dataset){
    $("#fragmentTreeDiv").empty();
    var datas = []; 
    multiple=0.7;
    datas.push(dataset);
    //分面树所占空间大小
    svg = d3.select("div#fragmentTreeDiv")
                .append("svg")
                .attr("width", $("#fragmentTreeDiv").width())
                .attr("height",$("#fragmentTreeDiv").height());
    //分面树的位置    
    $("svg").draggable();
    var seed = {x: $("#fragmentTreeDiv").width()*0.5, y: $("#fragmentTreeDiv").height()-30, name:dataset.name}; 
    var tree = buildTree(dataset, seed, multiple);
    draw_tree(tree, seed, svg, multiple);
}   
