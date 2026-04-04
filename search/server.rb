require 'json'
require 'webrick'

class TreeSearch
  def generate_random_tree
    values = (1..100).to_a.sample(15)
    build_tree(values.sort)
  end

  def build_tree(sorted_values)
    return nil if sorted_values.empty?
    mid = sorted_values.length / 2
    [
      sorted_values[mid],
      build_tree(sorted_values[0...mid]),
      build_tree(sorted_values[mid + 1..-1])
    ]
  end

  def search(tree, target)
    path = []
    found = search_recursive(tree, target, path)
    { found: found, value: target, path_values: path }
  end

  private

  def search_recursive(node, target, path)
    return false if node.nil?
    path << node[0]
    if node[0] == target
      true
    elsif target < node[0]
      search_recursive(node[1], target, path)
    else
      search_recursive(node[2], target, path)
    end
  end
end

$current_tree = nil
$ts = TreeSearch.new

class AppServlet < WEBrick::HTTPServlet::AbstractServlet
  def do_GET(request, response)
    response['Content-Type'] = 'application/json'
    response['Access-Control-Allow-Origin'] = '*'

    case request.path
    when '/api/tree'
      $current_tree = $ts.generate_random_tree
      response.body = JSON.generate({ tree: $current_tree })

    when '/api/search'
      if $current_tree.nil?
        response.status = 400
        response.body = JSON.generate({ error: 'Сначала сгенерируй дерево' })
        return
      end
      value = request.query['value'].to_i
      result = $ts.search($current_tree, value)
      response.body = JSON.generate(result)
    else
      response.status = 404
      response.body = JSON.generate({ error: 'Не найдено' })
    end
  end
end

server = WEBrick::HTTPServer.new(Port: 3000)
server.mount('/', AppServlet)

trap('INT') { server.shutdown }

server.start