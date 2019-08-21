/* This includes 10 files: src/evo_modal_window.js, src/evo_images.js, src/evo_user_crop.js, src/evo_user_report.js, src/evo_user_contact_groups.js, src/evo_rest_api.js, src/evo_item_flag.js, src/evo_links.js, ajax.js, shortlinks.js */
function openModalWindow(a,b,c,d,e,f){var g="overlay_page_active";void 0!==d&&1==d&&(g="overlay_page_active_transparent"),void 0===b&&(b="560px");var h="";if(void 0!==c&&(c>0||""!=c)&&(h=' style="height:'+c+'"'),jQuery("#overlay_page").length>0)return void jQuery("#overlay_page").html(a);jQuery("body").append('<div id="screen_mask"></div><div id="overlay_wrap" style="width:'+b+'"><div id="overlay_layout"><div id="overlay_page"'+h+"></div></div></div>"),jQuery("#screen_mask").fadeTo(1,.5).fadeIn(200),jQuery("#overlay_page").html(a).addClass(g),jQuery(document).on("click","#close_button, #screen_mask, #overlay_page",function(a){if("overlay_page"==jQuery(this).attr("id")){var b=jQuery("#overlay_page form");if(b.length){var c=b.position().top+jQuery("#overlay_wrap").position().top,d=c+b.height();a.clientY>c&&a.clientY<d||closeModalWindow()}return!0}return closeModalWindow(),!1})}function closeModalWindow(a){return void 0===a&&(a=window.document),jQuery("#overlay_page",a).hide(),jQuery(".action_messages",a).remove(),jQuery("#server_messages",a).insertBefore(".first_payload_block"),jQuery("#overlay_wrap",a).remove(),jQuery("#screen_mask",a).remove(),!1}function user_crop_avatar(a,b,c){void 0===c&&(c="avatar");var d=750,e=320,f=jQuery(window).width(),g=jQuery(window).height(),h=f,i=g,j=i/h;i=i>d?d:i<e?e:i,h=h>d?d:h<e?e:h;var k=10,l=10;k=h-2*k>e?10:0,l=i-2*l>e?10:0;var m=h>d?d:h,n=i>d?d:i;openModalWindow('<span id="spinner" class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',m+"px",n+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"],!0);var o=jQuery("div.modal-dialog div.modal-body").length?jQuery("div.modal-dialog div.modal-body"):jQuery("#overlay_page"),p={top:parseInt(o.css("paddingTop")),right:parseInt(o.css("paddingRight")),bottom:parseInt(o.css("paddingBottom")),left:parseInt(o.css("paddingLeft"))},q=(jQuery("div.modal-dialog div.modal-body").length?parseInt(o.css("min-height")):n-100)-(p.top+p.bottom),r=m-(p.left+p.right),s={user_ID:a,file_ID:b,aspect_ratio:j,content_width:r,content_height:q,display_mode:"js",crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(s.ctrl="user",s.user_tab="crop",s.user_tab_from=c):(s.blog=evo_js_blog,s.disp="avatar",s.action="crop"),jQuery.ajax({type:"POST",url:evo_js_user_crop_ajax_url,data:s,success:function(a){openModalWindow(a,m+"px",n+"px",!0,evo_js_lang_crop_profile_pic,[evo_js_lang_crop,"btn-primary"])}}),!1}function user_report(a,b){openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"],!0);var c={action:"get_user_report_form",user_ID:a,crumb_user:evo_js_crumb_user};return evo_js_is_backoffice?(c.is_backoffice=1,c.user_tab=b):c.blog=evo_js_blog,jQuery.ajax({type:"POST",url:evo_js_user_report_ajax_url,data:c,success:function(a){openModalWindow(a,"auto","",!0,evo_js_lang_report_user,[evo_js_lang_report_this_user_now,"btn-danger"])}}),!1}function user_contact_groups(a){return openModalWindow('<span class="loader_img loader_user_report absolute_center" title="'+evo_js_lang_loading+'"></span>',"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save,!0),jQuery.ajax({type:"POST",url:evo_js_user_contact_groups_ajax_url,data:{action:"get_user_contact_form",blog:evo_js_blog,user_ID:a,crumb_user:evo_js_crumb_user},success:function(a){openModalWindow(a,"auto","",!0,evo_js_lang_contact_groups,evo_js_lang_save)}}),!1}function evo_rest_api_request(url,params_func,func_method,method){var params=params_func,func=func_method;"function"==typeof params_func&&(func=params_func,params={},method=func_method),void 0===method&&(method="GET"),jQuery.ajax({contentType:"application/json; charset=utf-8",type:method,url:restapi_url+url,data:params}).then(function(data,textStatus,jqXHR){"object"==typeof jqXHR.responseJSON&&eval(func)(data,textStatus,jqXHR)})}function evo_rest_api_print_error(a,b,c){if("string"!=typeof b&&void 0===b.code&&(b=void 0===b.responseJSON?b.statusText:b.responseJSON),void 0===b.code)var d='<h4 class="text-danger">Unknown error: '+b+"</h4>";else{var d='<h4 class="text-danger">'+b.message+"</h4>";c&&(d+="<div><b>Code:</b> "+b.code+"</div><div><b>Status:</b> "+b.data.status+"</div>")}evo_rest_api_end_loading(a,d)}function evo_rest_api_start_loading(a){jQuery(a).addClass("evo_rest_api_loading").append('<div class="evo_rest_api_loader">loading...</div>')}function evo_rest_api_end_loading(a,b){jQuery(a).removeClass("evo_rest_api_loading").html(b).find(".evo_rest_api_loader").remove()}function evo_link_initialize_fieldset(a){if(jQuery("#"+a+"attachments_fieldset_table").length>0){var b=jQuery("#"+a+"attachments_fieldset_table").height();b=b>320?320:b<97?97:b,jQuery("#"+a+"attachments_fieldset_wrapper").height(b),jQuery("#"+a+"attachments_fieldset_wrapper").resizable({minHeight:80,handles:"s",resize:function(b,c){jQuery("#"+a+"attachments_fieldset_wrapper").resizable("option","maxHeight",jQuery("#"+a+"attachments_fieldset_table").height()),evo_link_update_overlay(a)}}),jQuery(document).on("click","#"+a+"attachments_fieldset_wrapper .ui-resizable-handle",function(){var b=jQuery("#"+a+"attachments_fieldset_table").height(),c=jQuery("#"+a+"attachments_fieldset_wrapper").height()+80;jQuery("#"+a+"attachments_fieldset_wrapper").css("height",c>b?b:c),evo_link_update_overlay(a)})}}function evo_link_update_overlay(a){jQuery("#"+a+"attachments_fieldset_overlay").length&&jQuery("#"+a+"attachments_fieldset_overlay").css("height",jQuery("#"+a+"attachments_fieldset_wrapper").closest(".panel").height())}function evo_link_fix_wrapper_height(a){var b=void 0===a?"":a,c=jQuery("#"+b+"attachments_fieldset_table").height();jQuery("#"+b+"attachments_fieldset_wrapper").height()!=c&&jQuery("#"+b+"attachments_fieldset_wrapper").height(jQuery("#"+b+"attachments_fieldset_table").height())}function evo_link_change_position(a,b,c){var d=a,e=a.value,f=a.id.substr(17);return jQuery.get(b+"anon_async.php?action=set_object_link_position&link_ID="+f+"&link_position="+e+"&crumb_link="+c,{},function(b,c){b=ajax_debug_clear(b),"OK"==b?(evoFadeSuccess(jQuery(d).closest("tr")),jQuery(d).closest("td").removeClass("error"),"cover"==e&&jQuery("select[name=link_position][id!="+a.id+"] option[value=cover]:selected").each(function(){jQuery(this).parent().val("aftermore"),evoFadeSuccess(jQuery(this).closest("tr"))})):(jQuery(d).val(b),evoFadeFailure(jQuery(d).closest("tr")),jQuery(d.form).closest("td").addClass("error"))}),!1}function evo_link_insert_inline(a,b,c,d,e){if(void 0==d&&(d=0),"undefined"!=typeof b2evoCanvas){var f="["+a+":"+b;c.length&&(f+=":"+c),f+="]",void 0!==e&&!1!==e&&(f+=e+"[/"+a+"]");var g=jQuery("#display_position_"+b);0!=g.length&&"inline"!=g.val()?(deferInlineReminder=!0,evo_rest_api_request("links/"+b+"/position/inline",function(a){g.val("inline"),evoFadeSuccess(g.closest("tr")),g.closest("td").removeClass("error"),textarea_wrap_selection(b2evoCanvas,f,"",d,window.document)},"POST"),deferInlineReminder=!1):textarea_wrap_selection(b2evoCanvas,f,"",d,window.document)}}function evo_link_delete(a,b,c,d){return evo_rest_api_request("links/"+c,{action:d},function(d){if("item"==b||"comment"==b||"emailcampaign"==b||"message"==b){var e=window.b2evoCanvas;if(null!=e){var f=new RegExp("\\[(image|file|inline|video|audio|thumbnail):"+c+":?[^\\]]*\\]","ig");textarea_str_replace(e,f,"",window.document)}}jQuery(a).closest("tr").remove(),evo_link_fix_wrapper_height()},"DELETE"),!1}function evo_link_change_order(a,b,c){return evo_rest_api_request("links/"+b+"/"+c,function(b){var d=jQuery(a).closest("tr"),e=d.find("span[data-order]");if("move_up"==c){var f=e.attr("data-order"),g=jQuery(d.prev()),h=g.find("span[data-order]"),i=h.attr("data-order");d.prev().before(d),e.attr("data-order",i),h.attr("data-order",f)}else{var f=e.attr("data-order"),j=jQuery(d.next()),k=j.find("span[data-order]"),l=k.attr("data-order");d.next().after(d),e.attr("data-order",l),k.attr("data-order",f)}evoFadeSuccess(d)},"POST"),!1}function evo_link_attach(a,b,c,d){return evo_rest_api_request("links",{action:"attach",type:a,object_ID:b,root:c,path:d},function(a){var b=jQuery("#attachments_fieldset_table .results table",window.parent.document),c=(b.parent,jQuery(a.list_content));b.replaceWith(jQuery("table",c)).promise().done(function(a){setTimeout(function(){window.parent.evo_link_fix_wrapper_height()},10)})}),!1}function evo_link_ajax_loading_overlay(){var a=jQuery("#attachments_fieldset_table"),b=!1;return 0==a.find(".results_ajax_loading").length&&(b=jQuery('<div class="results_ajax_loading"><div>&nbsp;</div></div>'),a.css("position","relative"),b.css({width:a.width(),height:a.height()}),a.append(b)),b}function evo_link_refresh_list(a,b,c){var d=evo_link_ajax_loading_overlay();return d&&evo_rest_api_request("links",{action:void 0===c?"refresh":"sort",type:a.toLowerCase(),object_ID:b},function(a){jQuery("#attachments_fieldset_table").html(a.html),d.remove(),evo_link_fix_wrapper_height()}),!1}function evo_link_sort_list(a){var b=jQuery("#"+a+"attachments_fieldset_table tbody.filelist_tbody tr");b.sort(function(a,c){var d=parseInt(jQuery("span[data-order]",a).attr("data-order")),e=parseInt(jQuery("span[data-order]",c).attr("data-order"));return d||(d=b.length),e||(e=b.length),d<e?-1:e<d?1:0});var c;$.each(b,function(b,d){0===b?(jQuery(d).prependTo("#"+a+"attachments_fieldset_table tbody.filelist_tbody"),c=d):(jQuery(d).insertAfter(c),c=d)})}function ajax_debug_clear(a){var b=/<!-- Ajax response end -->/;return a=a.replace(b,""),a=a.replace(/(<div class="jslog">[\s\S]*)/i,""),jQuery.trim(a)}function ajax_response_is_correct(a){var b=/<!-- Ajax response end -->/;return!!a.match(b)&&""!=(a=ajax_debug_clear(a))}function shortlinks_load_window(a,b){var c;switch(a){case"move_comment_to_post":c=shortlinks_title_move_comment_to_post,shortlinks_action_buttons='<button id="shortlinks_btn_move_comment" class="btn btn-primary">'+shortlinks_move_to_post+"</button>";break;case"shortlinks":c=shortlinks_title_link_to_post,shortlinks_action_buttons='<button id="shortlinks_btn_insert" class="btn btn-primary">'+shortlinks_insert_short_link+'</button><button id="shortlinks_btn_options" class="btn btn-default">'+shortlinks_insert_with_options+'...</button><button id="shortlinks_btn_form" class="btn btn-info">'+shortlinks_insert_snippet_link+"...</button>"}openModalWindow('<div id="shortlinks_wrapper"></div>',"auto","",!0,c,["-","shortlinks_post_buttons"],!0),shortlinks_load_colls(shortlinks_coll_urlname,b);var d=jQuery("#shortlinks_wrapper").parent(),e=jQuery(window).height()-20;return d.hasClass("modal-body")&&(e-=119+parseInt(d.css("padding-top"))+parseInt(d.css("padding-bottom"))),d.css({display:"block",overflow:"auto","max-height":e}),!1}function shortlinks_api_print_error(a,b,c){if("string"!=typeof b&&void 0===b.code&&(b=void 0===b.responseJSON?b.statusText:b.responseJSON),void 0===b.code)var d='<h4 class="text-danger">Unknown error: '+b+"</h4>";else{var d='<h4 class="text-danger">'+b.message+"</h4>";c&&(d+="<div><b>Code:</b> "+b.code+"</div><div><b>Status:</b> "+b.data.status+"</div>")}shortlinks_end_loading(a,d)}function shortlinks_api_request(a,b,c,d){shortlinks_start_loading(b),void 0===d&&(d={}),jQuery.ajax({url:restapi_url+a,data:d}).then(c,function(a){shortlinks_api_print_error(b,a)})}function shortlinks_start_loading(a){jQuery(a).addClass("shortlinks_loading").append('<div class="shortlinks_loader">loading...</div>')}function shortlinks_end_loading(a,b){jQuery(a).removeClass("shortlinks_loading").html(b).find(".shortlinks_loader").remove()}function shortlinks_get_pagination(a,b){var c="";if(void 0===a.pages_total||a.pages_total<2)return c;var d,e,f=void 0===b?"":' data-search="'+b.replace('"','"')+'"',g=a.page,h=a.pages_total,i=11;for(d=g<=parseInt(i/2)?1:g>h-parseInt(i/2)?Math.max(1,h-i+1):g-parseInt(i/2),e=g>h-parseInt(i/2)?h:Math.min(h,d+i-1),c+='<ul class="shortlinks_pagination pagination"'+f+">",g>1&&(c+='<li><a href="#" data-page="'+(g-1)+'">&lt;&lt;</a></li>'),d>1&&(c+='<li><a href="#" data-page="1">1</a></li>',d>2&&(c+='<li><a href="#" data-page="'+Math.ceil(d/2)+'">...</a></li>')),p=d;p<=e;p++)g==p?c+='<li class="active"><span>'+p+"</span></li>":c+='<li><a href="#" data-page="'+p+'">'+p+"</a></li>";return e<h&&(e<h-1&&(c+='<li><a href="#" data-page="'+(e+Math.floor((h-e)/2))+'">...</a></li>'),c+='<li><a href="#" data-page="'+h+'">'+h+"</a></li>"),g<h&&(c+='<li><a href="#" data-page="'+(g+1)+'">&gt;&gt;</a></li>'),c+="</ul>"}function shortlinks_load_colls(a,b){shortlinks_api_request("collections","#shortlinks_wrapper",function(c){var d="",e="",f='<div id="shortlinks_colls_list"><h2>'+shortlinks_collections+'</h2><select class="form-control" id="shortlinks_collections">';for(var g in c.colls){var h=c.colls[g];f+='<option value="'+h.urlname+'" data-coll-id="'+h.id+'" '+(a==h.urlname?' selected="selected"':"")+">"+h.shortname+" : "+h.name+"</option>",""!=d&&h.urlname!=a||(d=h.urlname,e=h.name)}f+='</select></div><div id="shortlinks_posts_block"></div><div id="shortlinks_post_block"></div><input type="hidden" id="shortlinks_hidden_prefix" value="'+(b||"")+'" /><div id="shortlinks_post_form" style="display:none"><input type="hidden" id="shortlinks_hidden_ID" /><input type="hidden" id="shortlinks_hidden_cover_link" /><input type="hidden" id="shortlinks_hidden_teaser_link" /><input type="hidden" id="shortlinks_hidden_urltitle" /><input type="hidden" id="shortlinks_hidden_title" /><input type="hidden" id="shortlinks_hidden_excerpt" /><input type="hidden" id="shortlinks_hidden_teaser" /><p><label><input type="checkbox" id="shortlinks_form_full_cover" /> '+shortlinks_insert_full_cover_image+'</label><p><p><label><input type="checkbox" id="shortlinks_form_title" checked="checked" /> '+shortlinks_insert_title+'</label><p><p><label><input type="checkbox" id="shortlinks_form_thumb_cover" checked="checked" /> '+shortlinks_insert_thumbnail_of_cover+'</label><p><p><label><input type="checkbox" id="shortlinks_form_excerpt" checked="checked" /> '+shortlinks_insert_excerpt+'</label><p><p><label><input type="checkbox" id="shortlinks_form_teaser" /> '+shortlinks_insert_teaser+'</label><p><p><label><input type="checkbox" id="shortlinks_form_more" checked="checked" /> '+shortlinks_insert_read_more_link+'</label><p></div><div id="shortlinks_post_options" class="form-horizontal" style="display:none"><div class="form-group"><label class="control-label col-sm-2">'+shortlinks_slug+':</label><div class="controls col-sm-10"><input type="text" id="shortlinks_opt_slug" class="form-control" style="width:100%" /></div></div><div class="form-group"><label class="control-label col-sm-2">'+shortlinks_mode+':</label><div class="controls col-sm-10"><div class="radio"><label><input type="radio" name="shortlinks_opt_mode" id="shortlinks_opt_mode_title" checked="checked"><code>[[...]]</code> '+shortlinks_use_title+'</label></div><div class="radio"><label><input type="radio" name="shortlinks_opt_mode" id="shortlinks_opt_mode_slug"><code>((...))</code> '+shortlinks_use_slug_words+'</label></div></div></div><div class="form-group"><label class="control-label col-sm-2">'+shortlinks_classes+':</label><div class="controls col-sm-10"><input type="text" id="shortlinks_opt_classes" class="form-control" style="width:100%" /></div></div><div class="form-group"><label class="control-label col-sm-2">'+shortlinks_target+':</label><div class="controls col-sm-10"><select id="shortlinks_opt_target" class="form-control"><option value="">'+shortlinks_none+'</option><option value="_blank">'+shortlinks_blank+'</option><option value="_parent">'+shortlinks_parent+'</option><option value="_top">'+shortlinks_top+'</option></select></div></div><div class="form-group"><label class="control-label col-sm-2">'+shortlinks_text+':</label><div class="controls col-sm-10"><input type="text" id="shortlinks_opt_text" class="form-control" style="width:100%" /></div></div></div>',shortlinks_end_loading("#shortlinks_wrapper",f),""!=d&&shortlinks_load_coll_posts(d,e)},{list_in_frontoffice:"all",per_page:-1})}function shortlinks_display_search_form(a,b,c){var d="<h2>"+b+'</h2><form class="form-inline" id="shortlinks_search__form" data-urlname="'+a+'"><div class="input-group"><input type="text" id="shortlinks_search__input" class="form-control" value="'+(void 0===c?"":c)+'"><span class="input-group-btn"><button id="shortlinks_search__submit" class="btn btn-primary">'+shortlinks_search+'</button></span></div> <button id="shortlinks_search__clear" class="btn btn-default">'+shortlinks_clear+'</button></form><div id="shortlinks_posts_list"></div>';jQuery("#shortlinks_posts_block").html(d)}function shortlinks_load_coll_posts(a,b,c){void 0!==b&&!1!==b&&shortlinks_display_search_form(a,b),shortlinks_api_request("collections/"+a+"/items&orderby=datemodified&order=DESC"+(void 0===c||c<2?"":"&page="+c),"#shortlinks_posts_list",function(b){var c="<ul>";for(var d in b.items){var e=b.items[d];c+='<li><a href="#" data-id="'+e.id+'" data-urlname="'+a+'">'+e.title+"</a></li>"}c+="</ul>",c+=shortlinks_get_pagination(b),shortlinks_end_loading("#shortlinks_posts_list",c)})}function shortlinks_load_coll_search(a,b,c){shortlinks_api_request("collections/"+a+"/search/"+b+"&kind=item"+(void 0===c||c<2?"":"&page="+c),"#shortlinks_posts_list",function(c){if(void 0!==c.code)return void shortlinks_api_print_error("#shortlinks_posts_list",c);var d="<ul>";for(var e in c.results){var f=c.results[e];"item"==f.kind&&(d+="<li>",d+='<a href="#" data-id="'+f.id+'" data-urlname="'+a+'">'+f.title+"</a>",d+="</li>")}d+="</ul>",d+=shortlinks_get_pagination(c,b),shortlinks_end_loading("#shortlinks_posts_list",d)})}function shortlinks_insert_link_text(a){"undefined"!=typeof tinyMCE&&void 0!==tinyMCE.activeEditor&&tinyMCE.activeEditor&&tinyMCE.execCommand("mceFocus",!1,tinyMCE.activeEditor.id),textarea_wrap_selection(window[jQuery("#shortlinks_hidden_prefix").val()+"b2evoCanvas"],a,"",0),closeModalWindow()}function shortlinks_insert_complex_link(a,b){var c="";void 0!==a&&""!=a&&(c+="\r\n"+a),jQuery("#shortlinks_form_title").is(":checked")&&(c+="\r\n## [["+jQuery("#shortlinks_hidden_urltitle").val()+" "+jQuery("#shortlinks_hidden_title").val()+"]]"),void 0!==b&&""!=b&&(c+="\r\n"+b),jQuery("#shortlinks_form_excerpt").is(":checked")&&(c+=(void 0!==b&&""!=b?" ":"\r\n")+jQuery("#shortlinks_hidden_excerpt").val()),jQuery("#shortlinks_form_teaser").is(":checked")&&(c+="\r\n"+jQuery("#shortlinks_hidden_teaser").val()),jQuery("#shortlinks_form_more").is(":checked")&&(c+="\r\n[["+jQuery("#shortlinks_hidden_urltitle").val()+" "+shortlinks_read_more+"...]]"),""!=c&&(c+="\r\n\r\n"),"undefined"!=typeof tinyMCE&&void 0!==tinyMCE.activeEditor&&tinyMCE.activeEditor&&tinyMCE.execCommand("mceFocus",!1,tinyMCE.activeEditor.id),textarea_wrap_selection(window[jQuery("#shortlinks_hidden_prefix").val()+"b2evoCanvas"],c,"",0),closeModalWindow()}jQuery(document).keyup(function(a){27==a.keyCode&&closeModalWindow()}),jQuery(document).ready(function(){jQuery("img.loadimg").each(function(){jQuery(this).prop("complete")?(jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")):jQuery(this).on("load",function(){jQuery(this).removeClass("loadimg"),""==jQuery(this).attr("class")&&jQuery(this).removeAttr("class")})})}),jQuery(document).on("click","a.evo_post_flag_btn",function(){var a=jQuery(this),b=parseInt(a.data("id"));return b>0&&(a.data("status","inprogress"),jQuery("span",jQuery(this)).addClass("fa-x--hover"),evo_rest_api_request("collections/"+a.data("coll")+"/items/"+b+"/flag",function(b){b.flag?(a.find("span:first").show(),a.find("span:last").hide()):(a.find("span:last").show(),a.find("span:first").hide()),jQuery("span",a).removeClass("fa-x--hover"),setTimeout(function(){a.removeData("status")},500)},"PUT")),!1}),jQuery(document).on("mouseover","a.evo_post_flag_btn",function(){"inprogress"!=jQuery(this).data("status")&&jQuery("span",jQuery(this)).addClass("fa-x--hover")}),"undefined"==typeof b2evo_shortlinks_initialized&&(b2evo_shortlinks_initialized=!0,jQuery(document).on("change","#shortlinks_colls_list select",function(){return shortlinks_load_coll_posts(jQuery(this).val(),jQuery("option:selected",this).text()),!1}),jQuery(document).on("submit","#shortlinks_search__form",function(){return shortlinks_load_coll_search(jQuery(this).data("urlname"),jQuery("#shortlinks_search__input").val()),!1}),jQuery(document).on("click","#shortlinks_search__clear",function(){return shortlinks_load_coll_posts(jQuery(this).closest("form").data("urlname")),jQuery("#shortlinks_search__input").val(""),!1}),jQuery(document).on("click","#shortlinks_posts_list a[data-id]",function(){var a=jQuery(this).data("urlname"),b=jQuery(this).data("id");return jQuery("#shortlinks_colls_list, #shortlinks_posts_block").hide(),jQuery("#shortlinks_post_block").show(),jQuery("#shortlinks_post_block").data("post")==b?jQuery("#shortlinks_btn_back_to_list, #shortlinks_btn_insert").show():(jQuery("#shortlinks_post_block").html(""),shortlinks_api_request("collections/"+a+"/items/"+b,"#shortlinks_post_block",function(a){jQuery("#shortlinks_post_block").data("post",a.id),jQuery("#shortlinks_hidden_ID").val(a.id),jQuery("#shortlinks_hidden_urltitle").val(a.urltitle),jQuery("#shortlinks_hidden_title").val(a.title),jQuery("#shortlinks_hidden_excerpt").val(a.excerpt),jQuery("#shortlinks_hidden_teaser").val(a.teaser),jQuery("#shortlinks_hidden_cover_link").val(""),jQuery("#shortlinks_hidden_teaser_link").val(""),jQuery("#shortlinks_hidden_coll_ID").val();var b="<h2>"+a.title+"</h2>";if("object"==typeof a.attachments&&a.attachments.length>0)for(var c in a.attachments){var d=a.attachments[c];"image"==d.type&&("cover"==d.position&&jQuery("#shortlinks_hidden_cover_link").val(d.link_ID),""==jQuery("#shortlinks_hidden_teaser_link").val()&&jQuery("#shortlinks_hidden_teaser_link").val(d.link_ID))}b+='<div id="shortlinks_post_content">'+a.content.replace(/(<h([1-6]).*id\s*=\s*"[^"]+"[^>]*>.+?)(<\/h\2>)/gi,'$1 <button class="btn btn-primary shortlinks_btn_insert_anchor">'+shortlinks_insert_short_link+"</button>$3")+"</div>",shortlinks_end_loading("#shortlinks_post_block",b);var e=jQuery(".shortlinks_post_buttons").length?jQuery(".shortlinks_post_buttons"):jQuery("#shortlinks_post_content");jQuery("#shortlinks_btn_back_to_list, #shortlinks_btn_move_comment, #shortlinks_btn_insert, #shortlinks_btn_form, #shortlinks_btn_options").remove(),e.after('<button id="shortlinks_btn_back_to_list" class="btn btn-default">&laquo; '+shortlinks_back+"</button>"+shortlinks_action_buttons),jQuery("#shortlinks_opt_slug").val(a.urltitle)})),!1}),jQuery(document).on("click","#shortlinks_btn_move_comment",function(){var a=jQuery(".comment_item_title")[0];a.innerHTML=jQuery("#shortlinks_hidden_title").val(),a.href="?ctrl=items&blog="+jQuery("#shortlinks_collections").find(":selected").data("coll-id")+"&p="+jQuery("#shortlinks_hidden_ID").val(),shortlinks_coll_urlname=jQuery("#shortlinks_collections").find(":selected").val(),jQuery('input[name="moveto_post"]').val(jQuery("#shortlinks_hidden_ID").val()),closeModalWindow()}),jQuery(document).on("click","#shortlinks_btn_insert",function(){shortlinks_insert_link_text("[["+jQuery("#shortlinks_hidden_urltitle").val()+"]]")}),jQuery(document).on("click",".shortlinks_btn_insert_anchor",function(){var a=jQuery(this).parent();shortlinks_insert_link_text("(("+jQuery("#shortlinks_hidden_urltitle").val()+"#"+a.attr("id")+" "+a.html().replace(/(\s<a[^>]+>.+?<\/a>)?\s<button[^>]+>.+?<\/button>$/,"")+"))")}),jQuery(document).on("click","#shortlinks_btn_insert_with_options",function(){if(jQuery("#shortlinks_opt_mode_title").is(":checked"))var a="[[",b="]]";else var a="((",b="))";var c=a;c+=jQuery("#shortlinks_opt_slug").val();var d=jQuery("#shortlinks_opt_classes").val().trim();""!=(d=d.replace(/^\./g,"").replace(/\s+/g,".").replace(/\.+/g,"."))&&(c+=" ."+d);var e=jQuery("#shortlinks_opt_target option:selected").val().trim();""!=e&&(c+=" "+e);var f=jQuery("#shortlinks_opt_text").val().trim();""!=f&&(c+=" "+f),c+=b,shortlinks_insert_link_text(c)}),jQuery(document).on("click","#shortlinks_btn_form",function(){jQuery("#modal_window .modal-title").html(shortlinks_insert_snippet_link),jQuery("#shortlinks_post_block, #shortlinks_btn_insert").hide(),jQuery("#shortlinks_post_form").show();var a=jQuery(".shortlinks_post_buttons").length?jQuery(".shortlinks_post_buttons"):jQuery("#shortlinks_post_content");return jQuery("#shortlinks_btn_back_to_list, #shortlinks_btn_move_comment, #shortlinks_btn_insert, #shortlinks_btn_form, #shortlinks_btn_options").hide(),a.after('<button id="shortlinks_btn_back_to_post" class="btn btn-default">&laquo; '+shortlinks_back+'</button><button id="shortlinks_btn_insert_complex" class="btn btn-primary">'+shortlinks_insert_snippet_link+"</button>"),!1}),jQuery(document).on("click","#shortlinks_btn_insert_complex",function(){if(!jQuery("input[id^=shortlinks_form_]").is(":checked"))return alert(shortlinks_select_item),!1;var a=!1,b=!1;jQuery("input[type=hidden][name=temp_link_owner_ID]").length?(a="temporary",b=jQuery("input[type=hidden][name=temp_link_owner_ID]").val()):jQuery("input[type=hidden][name=post_ID]").length&&jQuery("input[type=hidden][name=item_typ_ID]").length?(a="item",b=jQuery("input[type=hidden][name=post_ID]").val()):jQuery("input[type=hidden][name=comment_ID]").length||jQuery("input[type=hidden][name=comment_item_ID]").length?(a="comment",jQuery("input[type=hidden][name=comment_ID]").length&&(b=jQuery("input[type=hidden][name=comment_ID]").val())):jQuery("input[type=hidden][name=ecmp_ID]").length?(a="emailcampaign",b=jQuery("input[type=hidden][name=ecmp_ID]").val()):jQuery("input[name=msg_text]").length&&(a="message",b=0);var c=jQuery("#shortlinks_form_full_cover").is(":checked")&&""!=jQuery("#shortlinks_hidden_cover_link").val()||jQuery("#shortlinks_form_thumb_cover").is(":checked")&&""!=jQuery("#shortlinks_hidden_teaser_link").val();if(c&&0!=a&&b>0){shortlinks_start_loading("#shortlinks_post_block");var d="";jQuery("#shortlinks_form_full_cover").is(":checked")&&!jQuery("#shortlinks_form_thumb_cover").is(":checked")&&(d="cover"),evo_rest_api_request("links",{action:"copy",source_type:"item",source_object_ID:jQuery("#shortlinks_hidden_ID").val(),source_position:d,source_file_type:"image",dest_type:a,dest_object_ID:b,dest_position:"inline",limit_position:1},function(a){var b="",c="";for(var d in a.links){var e=a.links[d];"cover"==e.orig_position&&jQuery("#shortlinks_form_full_cover").is(":checked")&&(b="[image:"+e.ID+"]"),jQuery("#shortlinks_form_thumb_cover").is(":checked")&&(c="[thumbnail:"+e.ID+"]")}shortlinks_insert_complex_link(b,c),shortlinks_end_loading("#shortlinks_post_block",jQuery("#shortlinks_post_block").html());var f=jQuery("a[onclick*=evo_link_refresh_list]");f.length&&f.click()})}else c&&alert("Please save your "+a+" before trying to attach files. This limitation will be removed in a future version of b2evolution."),shortlinks_insert_complex_link();return!1}),jQuery(document).on("click","#shortlinks_btn_options",function(){jQuery("#modal_window .modal-title").html(shortlinks_insert_with_options+"..."),jQuery("#shortlinks_post_block, #shortlinks_btn_insert").hide(),jQuery("#shortlinks_post_options").show();var a=jQuery(".shortlinks_post_buttons").length?jQuery(".shortlinks_post_buttons"):jQuery("#shortlinks_post_content");return jQuery("#shortlinks_btn_back_to_list, #shortlinks_btn_insert, #shortlinks_btn_form, #shortlinks_btn_options").hide(),a.after('<button id="shortlinks_btn_back_to_post" class="btn btn-default">&laquo; '+shortlinks_back+'</button><button id="shortlinks_btn_insert_with_options" class="btn btn-primary">'+shortlinks_insert_link+"</button>"),!1}),jQuery(document).on("click","#shortlinks_btn_back_to_list",function(){return jQuery("#shortlinks_colls_list, #shortlinks_posts_block").show(),jQuery("#shortlinks_post_block, #shortlinks_btn_back_to_list, #shortlinks_btn_insert, #shortlinks_btn_form, #shortlinks_btn_options").hide(),!1}),jQuery(document).on("click","#shortlinks_btn_back_to_post",function(){return jQuery("#modal_window .modal-title").html(shortlinks_link_to_post),jQuery("#shortlinks_post_block, #shortlinks_btn_back_to_list, #shortlinks_btn_insert, #shortlinks_btn_form, #shortlinks_btn_options").show(),jQuery("#shortlinks_btn_back_to_post, #shortlinks_btn_insert_complex, #shortlinks_btn_insert_with_options, #shortlinks_post_form, #shortlinks_post_options").hide(),!1}),jQuery(document).on("click",".shortlinks_pagination a",function(){var a=jQuery("#shortlinks_colls_list select"),b=jQuery(this).closest(".shortlinks_pagination");return void 0==b.data("search")?shortlinks_load_coll_posts(a.val(),!1,jQuery(this).data("page")):shortlinks_load_coll_search(a.val(),b.data("search"),jQuery(this).data("page")),!1}));